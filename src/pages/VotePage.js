import { Button } from "@chakra-ui/button";
import { Box, Center, Flex, Heading, Spacer, Stack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import React from "react";
import useCandidates from "../hooks/useCandidates";
import useVote from "../hooks/useVote";
import { Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import FancyLink from "../components/FancyLink";
import useElection from "../hooks/useElection";

const VotePage = () => {
  const candidates = useCandidates();
  const { vote, remainingVotes } = useVote(candidates);
  const { expireDate, totalVotes } = useElection();

  const [value, setValue] = React.useState();

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
          <RadioGroup
            name="form-name"
            onChange={setValue}
            value={value}
            padding="8"
          >
            <Stack>
              {candidates.map((candidate) => (
                <Radio
                  size="lg"
                  key={candidate.id}
                  colorScheme="green"
                  value={candidate.id.toString()}
                >
                  {candidate.name}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
          <Button
            colorScheme="teal"
            size="lg"
            onClick={() => vote(value)}
            w="100%"
            disabled={!value || !remainingVotes}
          >
            Vote ({remainingVotes})
          </Button>
          <Flex marginTop="16px">
            <Link to="/results" component={FancyLink}>
              see results
            </Link>
          </Flex>
        </Box>
      </Container>
    </Center>
  );
};

export default VotePage;
