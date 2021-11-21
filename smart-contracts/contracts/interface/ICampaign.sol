// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity 0.8.10;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface ICampaign {
    /**
     * @dev The campaing status active when it is running, Ended when the deadline is reached
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
     * - state: Campaign - The campaign's state' active when it is running, The campaing status active when it is running, Ended when the deadline is reached
     * - goal: uint - The campaign's goal
     */
    struct CampaignInfo {
        string name;
        string description;
        string ipfsHash;
        CampaignState state;
        uint256 goal;
        uint256 deadline;
        uint256 amountRaised;
    }
    /**
     * events
     */
    event CampaignCreated(
        address indexed creator,
        address indexed campaignAddress,
        string name,
        string description,
        string ipfsHash,
        uint256 goal,
        uint256 deadline
    );

    event CampaignFunded(address indexed funder, uint256 amount);
    event CampaignRefunded(address indexed refunder, uint256 amount);
}
