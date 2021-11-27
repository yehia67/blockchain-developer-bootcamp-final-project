import toast from 'react-hot-toast';
import { Contract } from "@ethersproject/contracts";
import CampaignFactory from "@artifacts/CampaignFactory.json";
import Campaign from "@artifacts/Campaign.json";
import type { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";

export interface MetamaskError {
  message: string;
  code: number;
}
export interface Web3I {
  userAddress: string;
  contractAddress?: string;
  provider: Web3Provider;
}

export interface CampaignI {
  name: string;
  description: string;
  ipfsHash: string;
  goal: string;
}
export interface CampaignInfoI {
  contractAddress: string;
  info: {
    owner: string;
    status: string;
    name: string;
    description: string;
    ipfsHash: string;
    goal: number;
    amountRaised: number;
  };
}
const status = Object.freeze(["Funding", "Ended"]);
export const getCampaignInfo = async (
  campaignAddress: string
): Promise<CampaignInfoI | undefined> => {
  try {
    const localProvider = new ethers.providers.AlchemyProvider("ropsten");
    const contract = new Contract(campaignAddress, Campaign.abi, localProvider);
    const campaignInfo = await contract.callStatic["campaignInfo"]();
    return {
      contractAddress: campaignAddress,
      info: {
        owner: campaignInfo.owner,
        name: campaignInfo.name,
        description: campaignInfo.description,
        ipfsHash: campaignInfo.ipfsHash,
        status: status[campaignInfo.state],
        goal: Number(ethers.utils.formatEther(campaignInfo.goal.toString())),
        amountRaised: Number(
          ethers.utils.formatEther(campaignInfo.amountRaised.toString())
        ),
      },
    };
  } catch (error) {
    console.log("the error here");
    console.log(error);
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
        return await getCampaignInfo(address);
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
    toast.success("Transaction Pending...Check your metamask wallet");
    await provider.waitForTransaction(deployedCampaigns.hash);
    toast.success("Transaction Confirmed...Campaign Created!");
    return deployedCampaigns;
  } catch (error) {
    if ((error as MetamaskError).message.includes("revert")) {
      toast.error("Transaction Reverted");
    }
    if ((error as MetamaskError).code === 4001) {
      toast.error("Transaction Rejected");
    }
    console.error(error);
  }
};

export const fund = async (
  fundAmount: string,
  { userAddress, provider, contractAddress }: Web3I
) => {
  try {
    if (!provider || !userAddress || !contractAddress) {
      console.log("no provider found");
      return;
    }
    const contract = new Contract(
      contractAddress,
      Campaign.abi,
      provider.getSigner(userAddress).connectUnchecked()
    );
    const funds = await contract.fund({
      value: ethers.utils.parseEther(fundAmount),
    });
    return funds.hash;
  } catch (error) {
    if ((error as MetamaskError).message.includes("revert")) {
      console.error("transaction reverted");
    }
    if ((error as MetamaskError).code === 4001) {
      console.error("transaction rejected");
    }
    console.error(error);
  }
};

export const refund = async ({
  userAddress,
  provider,
  contractAddress,
}: Web3I) => {
  try {
    if (!provider || !userAddress || !contractAddress) {
      console.log("no provider found");
      return;
    }
    const contract = new Contract(
      contractAddress,
      Campaign.abi,
      provider.getSigner(userAddress).connectUnchecked()
    );
    const refund = await contract.refund();
    return refund.hash;
  } catch (error) {
    if ((error as MetamaskError).message.includes("revert")) {
      console.error("transaction reverted");
    }
    if ((error as MetamaskError).code === 4001) {
      console.error("transaction rejected");
    }
    console.error(error);
  }
};

export const claimFunds = async ({
  userAddress,
  provider,
  contractAddress,
}: Web3I) => {
  try {
    if (!provider || !userAddress || !contractAddress) {
      console.log("no provider found");
      return;
    }
    const contract = new Contract(
      contractAddress,
      Campaign.abi,
      provider.getSigner(userAddress).connectUnchecked()
    );
    const funds = await contract.claimFunds();
    return funds.hash;
  } catch (error) {
    if ((error as MetamaskError).message.includes("revert")) {
      console.error("transaction reverted");
    }
    if ((error as MetamaskError).code === 4001) {
      console.error("transaction rejected");
    }
    console.error(error);
  }
};

export const getUserFundsAmount = async ({
  userAddress,
  provider,
  contractAddress,
}: Web3I) => {
  try {
    if (!provider || !userAddress || !contractAddress) {
      console.log("no provider found");
      return;
    }
    const contract = new Contract(contractAddress, Campaign.abi, provider);
    const funds = await contract.getFunds();
    return Number(ethers.utils.formatEther(funds.toString()));
  } catch (error) {
    console.error(error);
  }
};
