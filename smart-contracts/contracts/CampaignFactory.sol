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
    Campaign[] public campaigns;
    uint256 private minGoal;

    modifier validGoal(uint256 _goal) {
        require(_goal >= minGoal, 'REVERT: Goal must be greater or equal to the minimum amount');
        _;
    }

    constructor(uint256 _minGoal) {
        minGoal = _minGoal;
    }

    function createCampaign(
        string memory name,
        string memory description,
        string memory ipfsHash,
        uint256 goal
    ) external validGoal(goal) {
        Campaign campaign = new Campaign(name, description, ipfsHash, goal);
        campaigns.push(campaign);
        emit CampaignDeployed(_msgSender(), address(campaign), name, description, ipfsHash, goal);
    }

    function getDeployedCampaigns() external view returns (Campaign[] memory) {
        return campaigns;
    }

    /**
     * @dev Get the minimum goal for a campaign
     */
    function getMinGoal() external view returns (uint256) {
        return minGoal;
    }

    /**
     * @dev Set the minimum goal for a campaign
     */
    function setMinGoal(uint256 _minGoal) external onlyOwner {
        minGoal = _minGoal;
    }
}
