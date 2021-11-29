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

    /**
     * @dev Called if other functions don't match call or
     * sent ether without data
     * Typically, called when invalid data is sent
     * Added so ether sent to this contract is reverted if the contract fails
     * otherwise, the sender's money is transferred to contract
     */
    fallback() external payable {
        revert();
    }

    /**
     * @dev for contract to recive wei
     */
    receive() external payable {
        fund();
    }

    /**
     * @dev Fund the campaign
     * campaign should be active and should send a valid amount of wei.
     */
    function fund() public payable isActive isValidWeiAmount {
        funders[_msgSender()] += msg.value;
        campaignInfo.amountRaised += msg.value;
        emit CampaignFunded(_msgSender(), msg.value);
    }

    /**
     * @dev Refund the campaign
     * campaign should be active and should a funder.
     */
    function refund() external isfunder isActive {
        uint256 amount = funders[_msgSender()];
        campaignInfo.amountRaised -= amount;
        funders[_msgSender()] = 0;
        payable(_msgSender()).transfer(amount);

        emit CampaignRefunded(_msgSender(), funders[_msgSender()]);
    }

    /**
     * @dev claim the campaign fund
     * campaign should be active and should be the campaign owner
     * and the campaign should reach the goal.
     */
    function claimFunds() external isActive isGoalAchived onlyOwner {
        campaignInfo.state = CampaignState.ENDED;
        payable(campaignInfo.owner).transfer(campaignInfo.amountRaised);
        emit CampaignClaimed(campaignInfo.owner, campaignInfo.amountRaised);
    }

    /**
     * @dev check the funder amount of funds
     * @return uint256 the funded amount by the caller
     */
    function getFunds() external view returns (uint256) {
        return funders[_msgSender()];
    }
}
