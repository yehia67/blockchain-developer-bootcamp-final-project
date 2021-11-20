import { Flex, Box, Heading, Text, Button } from "@chakra-ui/react";
import Img from "next/image";
import ProgressBar from "@components/ProgressBar";

import styles from "./styles.module.css";

// https://github.com/ogzhanolguncu/ogzhanolguncu.com/blob/5e06c2a2d35d65fb0362676a822f66e31f8a75a5/components/HeroSection.tsx

function Project() {
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
          Title
        </Heading>
        <Text
          fontSize={["1rem", "1rem", "1.2rem", "1.3rem"]}
          marginBottom="2.5rem"
          fontWeight="400"
          padding="1rem"
        >
          This website is my 📚 digital library of the things I have learned and
          created over the years, and anything else I want to write about. You
          make projects with me and lets share fundss
        </Text>
        <Box display="flex" p={1} alignItems="center">
          <ProgressBar collected={2} goal={20} max={100} />
        </Box>
        <Box m={1} flexDirection={["column", "column", "row", "row"]} d="flex">
          <Button
            color="white"
            padding="30px 30px"
            _hover={{
              backgroundColor: "light",
            }}
            fontWeight="600"
            fontSize={["15px", "16px", "16px", "18px"]}
            mb={["10px", "10px", "0px", "0px"]}
            mr={["0px", "0", "10px", "10px"]}
          >
            <Text mr="8px">&#9889;</Text>
            Refund
          </Button>
          <Button
            padding="30px 30px"
            fontWeight="600"
            fontSize={["15px", "16px", "16px", "18px"]}
            _hover={{
              backgroundColor: "orange.500",
              color: "white",
            }}
          >
            <Text mr="8px">&#128239;</Text> Fund
          </Button>
        </Box>
      </Box>
      <Box p={5}>
        <Img
          className={styles.image}
          src="https://bit.ly/2Z4KKcF"
          alt={"titileeee"}
        />
      </Box>
    </Flex>
  );
}

export default Project;
