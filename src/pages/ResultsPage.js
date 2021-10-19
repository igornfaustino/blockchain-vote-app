import { Box, Center, Flex, Heading, Spacer } from "@chakra-ui/layout";
import React from "react";
import { Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import FancyLink from "../components/FancyLink";
import useElection from "../hooks/useElection";
import useResults from "../hooks/useResults";

const ResultsPage = () => {
  const { expireDate, totalVotes } = useElection();
  const results = useResults();

  const temp = Object.entries(results)
    .sort(([, votesA], [, votesB]) => votesB - votesA)
    .map(([name, votes]) => (
      <p>
        {name} : {votes}
      </p>
    ));

  return (
    <Center minHeight="100vh">
      <Container maxW="xl">
        <Box padding="4" bg="gray.50" maxW="3xl">
          <Heading size="lg" textAlign="center">
            Blockchain super cool vote app
          </Heading>
          <Flex paddingLeft="4" paddingRight="4">
            <Box p="4">total: {totalVotes}</Box>
            <Spacer />
            <Box p="4">{expireDate}</Box>
          </Flex>
          <Box padding="8">{temp}</Box>
          <Flex marginTop="16px">
            <Link to="/" component={FancyLink}>
              vote more
            </Link>
          </Flex>
        </Box>
      </Container>
    </Center>
  );
};

export default ResultsPage;
