// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity 0.8.10;
import '../Campaign.sol';

/**
 * @dev Interface of the Campaign factory.
 */
interface ICampaignFactory {
    /**
     * events
     */
    event CampaignDeployed(
        address indexed creator,
        address indexed campaignAddress,
        string name,
        string description,
        string ipfsHash,
        uint256 goal
    );

    function getMinGoal() external view returns (uint256);

    function getDeployedCampaigns() external view returns (Campaign[] memory);
}
