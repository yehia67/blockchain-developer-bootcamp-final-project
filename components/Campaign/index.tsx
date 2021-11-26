import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import Img from "next/image";
import { useEthers } from "@usedapp/core";
import type { Web3Provider } from "@ethersproject/providers";

import ProgressBar from "@components/ProgressBar";
import styles from "./styles.module.css";
import { fund, refund, claimFunds } from "@services/smartContracts";

export interface CampaignProps {
  owner: string;
  contractAddress: string;
  name: string;
  description: string;
  goal: number;
  raisedAmount: number;
  status: string;
  ipfsHash: string;
}
function Campaign({
  owner,
  contractAddress,
  name,
  description,
  goal,
  raisedAmount,
  status,
  ipfsHash,
}: CampaignProps) {
  const { library, account } = useEthers();
  const [fundAmount, setFundAmount] = React.useState("0");
  console.log(goal, owner, status);
  return (
    <Flex
      margin={["1.5rem 0", "1.5rem 0", "1.5rem 0", "4.5rem 0"]}
      flexDirection={["column-reverse", "column-reverse", "row"]}
      justifyContent="space-between"
    >
      <Box maxW="600px">
        <Heading
          fontSize={["1.6rem", "2rem", "2.3rem", "2.6rem"]}
          lineHeight="1.4"
          marginBottom="2rem"
          marginTop={["0.6rem", "0", "0", "0"]}
          padding="1rem"
          fontWeight="bold"
        >
          {name}
        </Heading>
        <Text
          fontSize={["1rem", "1rem", "1.2rem", "1.3rem"]}
          marginBottom="2.5rem"
          fontWeight="400"
          padding="1rem"
        >
          {description}
        </Text>
        <Box display="flex" p={1} alignItems="center">
          <ProgressBar collected={raisedAmount} goal={goal} max={100} />
        </Box>
        <Box display="flex" p={1} alignItems="center">
          <NumberInput
            defaultValue={fundAmount}
            min={0}
            onChange={(valueAsString: string, valueAsNumber: number) =>
              setFundAmount(valueAsString)
            }
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box m={1} flexDirection={["column", "column", "row", "row"]} d="flex">
          <Button
            m={1}
            padding="30px 30px"
            fontWeight="600"
            fontSize={["15px", "16px", "16px", "18px"]}
            _hover={{
              backgroundColor: "orange.500",
              color: "white",
            }}
            onClick={() =>
              refund(fundAmount, {
                userAddress: account as string,
                provider: library as Web3Provider,
                contractAddress,
              })
            }
          >
            <Text mr="8px">&#9889;</Text>
            Refund
          </Button>
          <Button
            m={1}
            padding="30px 30px"
            fontWeight="600"
            fontSize={["15px", "16px", "16px", "18px"]}
            _hover={{
              backgroundColor: "orange.500",
              color: "white",
            }}
            onClick={() =>
              fund(fundAmount, {
                userAddress: account as string,
                provider: library as Web3Provider,
                contractAddress,
              })
            }
          >
            <Text mr="8px">&#128239;</Text> Fund
          </Button>
          <Button
            m={1}
            padding="30px 30px"
            fontWeight="600"
            fontSize={["15px", "16px", "16px", "18px"]}
            _hover={{
              backgroundColor: "orange.500",
              color: "white",
            }}
            onClick={() =>
              claimFunds({
                userAddress: account as string,
                provider: library as Web3Provider,
                contractAddress,
              })
            }
            disabled={owner !== account}
          >
            <Text mr="8px">&#128239;</Text> Claim Funds
          </Button>
        </Box>
      </Box>
      <Box p={5}>
        <Img
          className={styles.image}
          src={`https://ipfs.io/ipfs/${ipfsHash}`}
          alt="Image of funded project"
          width="100%"
          height="100%"
        />
      </Box>
    </Flex>
  );
}

export default Campaign;
