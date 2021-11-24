// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity 0.8.10;

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
}
