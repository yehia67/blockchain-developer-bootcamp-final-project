import { Contract } from "@ethersproject/contracts";
import CampaignFactory from "@artifacts/CampaignFactory.json";
import Campaign from "@artifacts/Campaign.json";
import type { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

export interface Web3I {
  userAddress: string;
  provider: Web3Provider;
}

export interface CampaignI {
  name: string;
  description: string;
  ipfsHash: string;
  goal: string;
}

export const getCampaignInfo = async (
  campaignAddress: string,
  library: Web3Provider
) => {
  try {
    if (!library) {
      console.log("no library found");
      return;
    }
    const contract = new Contract(campaignAddress, Campaign.abi, library);
    const campaignInfo = await contract.callStatic["campaignInfo"]();
    return campaignInfo;
  } catch (error) {
    console.error(error);
  }
};

export const getCampaigns = async (library: Web3Provider) => {
  try {
    if (!library) {
      console.log("no library found");
      return;
    }
    const contract = new Contract(
      CampaignFactory.address,
      CampaignFactory.abi,
      library
    );
    const deployedCampaigns = await contract.callStatic[
      "getDeployedCampaigns"
    ]();
    return await Promise.all(
      deployedCampaigns.map(async (address: string) => {
        return await getCampaignInfo(address, library);
      })
    );
  } catch (error) {
    console.error(error);
  }
};

export const createCampaign = async (
  { name, description, ipfsHash, goal }: CampaignI,
  { userAddress, provider }: Web3I
) => {
  try {
    if (!provider || !userAddress) {
      console.log("no provider found");
      return;
    }
    const contract = new Contract(
      CampaignFactory.address,
      CampaignFactory.abi,
      provider.getSigner(userAddress).connectUnchecked()
    );
    const deployedCampaigns = await contract.createCampaign(
      name,
      description,
      ipfsHash,
      ethers.utils.parseEther(goal)
    );
    return deployedCampaigns;
  } catch (error) {
    console.error(error);
  }
};
