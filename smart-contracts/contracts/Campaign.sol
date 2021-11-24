// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity 0.8.10;

import '@openzeppelin/contracts/utils/Context.sol';

import './interface/ICampaign.sol';

/**
 * @title Campaign
 * @dev Campaign contract
 */
contract Campaign is Context, ICampaign {
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
        campaignInfo = CampaignInfo(owner,name, description, ipfsHash, CampaignState.ACTIVE, goal, 0);
    }

    function fund() external payable isActive {
        funders[_msgSender()] += msg.value;
        campaignInfo.amountRaised += msg.value;
        emit CampaignFunded(_msgSender(), msg.value);
    }

    function refund() external payable isfunder {
        require(msg.value <= funders[_msgSender()], 'REVERT: You can not refund more than you have');
        funders[_msgSender()] -= msg.value;
        campaignInfo.amountRaised -= msg.value;

        (bool isSent, ) = payable(_msgSender()).call{value: msg.value}(abi.encode(msg.value));

        require(isSent, 'Failed to send Ether');

        emit CampaignRefunded(_msgSender(), msg.value);
    }

    function claimFunds() external isActive isGoalAchived onlyOwner {
        (bool isSent, ) = payable(_msgSender()).call{value: campaignInfo.amountRaised}(
            abi.encode(campaignInfo.amountRaised)
        );

        require(isSent, 'Failed to send Ether');

        campaignInfo.state = CampaignState.ENDED;
        emit CampaignClaimed(_msgSender(), campaignInfo.amountRaised);
    }
}
