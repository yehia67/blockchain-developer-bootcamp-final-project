// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity 0.8.10;

/**
 * @dev Interface of the Campaign.
 */
interface ICampaign {
    /**
     * @dev The campaign status active when it is running, Ended when the deadline is reached
     */
    enum CampaignState {
        ACTIVE,
        ENDED
    }

    /**
     * @dev The campaign's information is stored in the following variables:
     * - name: string - The campaign's name
     * - description: string - The campaign's description
     * - ipfsHash: string - The campaign's image in IPFS hash
     * - state: Campaign - The campaign's state' active when it is running, The campaign status active when it is running, Ended when the deadline is reached
     * - goal: uint - The campaign's goal
     */
    struct CampaignInfo {
        address owner;
        string name;
        string description;
        string ipfsHash;
        CampaignState state;
        uint256 goal;
        uint256 amountRaised;
    }
    /**
     * events
     */
    event CampaignFunded(address indexed funder, uint256 amount);
    event CampaignRefunded(address indexed refunder, uint256 amount);
    event CampaignClaimed(address indexed owner, uint256 amount);
}
