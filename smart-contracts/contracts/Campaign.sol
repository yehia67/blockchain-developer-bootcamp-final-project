// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity 0.8.10;

import '@openzeppelin/contracts/access/Ownable.sol';

import './interface/ICampaign.sol';

/**
 * @title Campaign
 * @dev Campaign contract
 */
contract Campaign is Ownable, ICampaign {
    CampaignInfo public campaignInfo;
    mapping(address => uint256) funders;

    /**
     * @dev Campaing should be in active state
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
     * @dev Constructor
     * @param _campaignInfo CampaignInfo
     */
    constructor(CampaignInfo memory _campaignInfo) {
        campaignInfo = CampaignInfo(
            _campaignInfo.name,
            _campaignInfo.ipfsHash,
            _campaignInfo.description,
            _campaignInfo.state,
            _campaignInfo.goal,
            _campaignInfo.deadline,
            _campaignInfo.amountRaised
        );
    }

    function fund() external payable isActive {
        funders[_msgSender()] += msg.value;
        campaignInfo.amountRaised += msg.value;
        emit CampaignFunded(_msgSender(),msg.value);
    }

    function refund() external payable isfunder {
        require(msg.value <= funders[_msgSender()], 'REVERT: You can not refund more than you have');
        funders[_msgSender()] -= msg.value;
        campaignInfo.amountRaised -= msg.value;
        
        (bool isSent,) = payable(_msgSender()).call{value: msg.value}(abi.encode(msg.value));
       
        require(isSent, "Failed to send Ether");

        emit CampaignRefunded(_msgSender(),msg.value);
    }
}
