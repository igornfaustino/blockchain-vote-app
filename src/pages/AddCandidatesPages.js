import { Box, Center, Heading } from "@chakra-ui/layout";
import React, { useState } from "react";
import { Container, Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { getSignerContract } from "../utils/etherUtil";

const AddCandidatesPage = () => {
  const [name, setName] = useState("");

  const onClick = async () => {
    if (!name) return;
    const contract = getSignerContract();

    const transaction = await contract.addCandidate(name);
    await transaction.wait();

    setName("");
  };

  return (
    <Center minHeight="100vh">
      <Container maxW="xl">
        <Box padding="4" bg="gray.50" maxW="3xl">
          <Heading size="lg" textAlign="center" marginBottom="8">
            Add a new candidate
          </Heading>
          <Input
            placeholder="candidate name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            colorScheme="teal"
            size="md"
            w="100%"
            marginTop="8"
            disabled={!name}
            onClick={onClick}
          >
            Add
          </Button>
        </Box>
      </Container>
    </Center>
  );
};

export default AddCandidatesPage;
