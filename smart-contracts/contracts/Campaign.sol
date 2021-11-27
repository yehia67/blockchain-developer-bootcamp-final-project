// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity 0.8.10;

import '@openzeppelin/contracts/utils/Context.sol';
import '@openzeppelin/contracts/utils/Address.sol';

import './interface/ICampaign.sol';

/**
 * @title Campaign
 * @dev Campaign contract
 */
contract Campaign is Context, ICampaign {
    using Address for address payable;

    CampaignInfo public campaignInfo;
    mapping(address => uint256) funders;

    /**
     * @dev only campaign owner can call this function
     */
    modifier onlyOwner() {
        require(_msgSender() == campaignInfo.owner);
        _;
    }
    /**
     * @dev Campaign should be in active state
     */
    modifier isActive() {
        require(campaignInfo.state == CampaignState.ACTIVE, 'REVERT: Campaign is not active');
        _;
    }

    /**
     * @dev should be a funder
     */
    modifier isfunder() {
        require(funders[_msgSender()] > 0, 'REVERT: You are not a funder');
        _;
    }

    /**
     * @dev should send a valid wei amount
     */
    modifier isValidWeiAmount() {
        require(msg.value > 0, 'REVERT: The amount of wei should be more than zero');
        _;
    }

    /**
     * @dev should send a valid wei amount
     */
    modifier isGoalAchived() {
        require(campaignInfo.amountRaised >= campaignInfo.goal, 'REVERT: campaign need to reach goal');
        _;
    }

    /**
     * @dev Constructor
     * @param owner address
     * @param name Campaign name
     * @param description Campaign description
     * @param ipfsHash Campaign image in IPFS Hash
     * @param goal Campaign goal
     */
    constructor(
        address owner,
        string memory name,
        string memory description,
        string memory ipfsHash,
        uint256 goal
    ) {
        campaignInfo = CampaignInfo(owner, name, description, ipfsHash, CampaignState.ACTIVE, goal, 0);
    }

    fallback() external payable {
        revert();
    }

    receive() external payable {
        fund();
    }

    function fund() public payable isActive isValidWeiAmount {
        funders[_msgSender()] += msg.value;
        campaignInfo.amountRaised += msg.value;
        emit CampaignFunded(_msgSender(), msg.value);
    }

    function refund() external isfunder {
        campaignInfo.amountRaised -= funders[_msgSender()];
        payable(_msgSender()).transfer(funders[_msgSender()]);

        emit CampaignRefunded(_msgSender(), funders[_msgSender()]);
    }

    function claimFunds() external isActive isGoalAchived onlyOwner {
        campaignInfo.state = CampaignState.ENDED;
        payable(_msgSender()).transfer(campaignInfo.amountRaised);

        emit CampaignClaimed(_msgSender(), campaignInfo.amountRaised);
    }

    function getFunds() external view returns (uint256) {
        return funders[_msgSender()];
    }
}
