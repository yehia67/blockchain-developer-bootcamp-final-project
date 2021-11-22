// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity 0.8.10;

import '@openzeppelin/contracts/access/Ownable.sol';

import './interface/ICampaignFactory.sol';

import './Campaign.sol';

/**
 * @title Campaign
 * @dev Campaign contract
 */
contract CampaignFactory is Ownable, ICampaignFactory {
    Campaign[] campaigns;

    function createCampaign(
        string memory name,
        string memory description,
        string memory ipfsHash,
        uint256 goal,
        uint256 amountRaised
    ) external {
        Campaign campaign = new Campaign(name, description, ipfsHash, goal, amountRaised);
        campaigns.push(campaign);
        emit CampaignDeployed(_msgSender(), address(campaign), name, description, ipfsHash, goal);
    }
}
