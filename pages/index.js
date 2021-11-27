import React from "react";

import { Grid } from "@chakra-ui/react";
import { Link, Spinner } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";

import Card from "@components/Card";
import { getCampaigns } from "@services/smartContracts";

export default function Home() {
  const { library, account } = useEthers();
  const [provider, setProvider] = React.useState();
  const [campaigns, setCampaigns] = React.useState([]);

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

  const handleGetCampaigns = React.useCallback(async () => {
    const newCampaigns = await getCampaigns();
    setCampaigns(newCampaigns);
  }, []);

  React.useEffect(() => {
    handleGetCampaigns();
    if (library) {
      setProvider(library);
    }
  }, [library, handleGetCampaigns]);

  React.useEffect(() => {
    if (window && window.ethereum) {
      networkHandler();
    }
  }, [provider, account, networkHandler]);

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={3}>
      {campaigns.length === 0 ? (
        <Spinner
          display="flex"
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
        campaigns
          .slice(0)
          .reverse()
          .map((campaign) => (
            <Link
              key={`campaign/${campaign.contractAddress}`}
              href={`campaign/${campaign.contractAddress}`}
            >
              <Card
                name={campaign.info.name}
                ipfsHash={campaign.info.ipfsHash}
                goal={campaign.info.goal}
                raisedAmount={campaign.info.amountRaised}
                status={campaign.info.status}
              />
            </Link>
          ))
      )}
    </Grid>
  );
}
