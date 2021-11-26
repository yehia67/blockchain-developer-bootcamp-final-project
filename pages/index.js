import React from "react";

import { Grid } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

import Card from "@components/Card";
import { getCampaigns, createCampaign } from "@services/smartContracts";
import { useEthers } from "@usedapp/core";
const projects = [
  {
    id: 1,
    collected: 10,
    goal: 20,
    max: 100,
  },
  {
    id: 2,
    collected: 10,
    goal: 20,
    max: 100,
  },
  {
    id: 3,
    collected: 10,
    goal: 20,
    max: 100,
  },
  {
    id: 4,
    collected: 10,
    goal: 20,
    max: 100,
  },
  {
    id: 5,
    collected: 10,
    goal: 20,
    max: 100,
  },
  {
    id: 6,
    collected: 10,
    goal: 20,
    max: 100,
  },
];
export default function Home() {
  const { library, account } = useEthers();
  const [provider, setProvider] = React.useState();

  const networkHandler = React.useCallback(async () => {
    try {
      if (!provider) {
        console.log("provider is null");
        return;
      }
      const { chainId } = await provider.getNetwork();
      if (chainId !== 3) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x3" }], // chainId must be in hexadecimal numbers
        });
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }, []);

  const handleGetCampaigns = React.useCallback(async (library) => {
    const campaigns = await getCampaigns(library);
    console.log({ campaigns });
  }, []);

  React.useEffect(() => {
    if (library) {
      setProvider(library);
      handleGetCampaigns(library);
    }
  }, [library, handleGetCampaigns]);

  React.useEffect(() => {
    if (window && window.ethereum) {
      networkHandler();
    }
  }, [provider, account, networkHandler]);

  const handleCreateCampaign = async () => {
    Promise.all(
      createCampaign(
        {
          name: "Campaign 5",
          description: "Campaign Description 5",
          ipfsHash: "ipfs hash 5",
          goal: "12",
        },
        { userAddress: account, provider }
      ),
      createCampaign(
        {
          name: "Campaign 6",
          description: "Campaign Description 6",
          ipfsHash: "ipfs hash 6",
          goal: "20",
        },
        { userAddress: account, provider }
      ),
      createCampaign(
        {
          name: "Campaign 7",
          description: "Campaign Description 7",
          ipfsHash: "ipfs hash 7",
          goal: "15",
        },
        { userAddress: account, provider }
      ),
      createCampaign(
        {
          name: "Campaign 8",
          description: "Campaign Description 8",
          ipfsHash: "ipfs hash 8",
          goal: "8.4",
        },
        { userAddress: account, provider }
      ),
      createCampaign(
        {
          name: "Campaign 9",
          description: "Campaign Description 9",
          ipfsHash: "ipfs hash 9",
          goal: "17",
        },
        { userAddress: account, provider }
      ),
      createCampaign(
        {
          name: "Campaign 10",
          description: "Campaign Description 10",
          ipfsHash: "ipfs hash 10",
          goal: "5.5",
        },
        { userAddress: account, provider }
      )
    );
  };
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={3}>
      {projects.map((project) => (
        <Link key={`project/${project.id}`} href={`project/${project.id}`}>
          <Card project={project} />
          <button onClick={handleCreateCampaign}>Create Campaign</button>
        </Link>
      ))}
    </Grid>
  );
}
