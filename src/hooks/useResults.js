/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getContract } from "../utils/etherUtil";
import useCandidates from "./useCandidates";

const useResults = () => {
  const candidates = useCandidates();
  const [results, setResults] = useState({});

  async function fetchCandidateVotes() {
    if (typeof window.ethereum === "undefined") return;

    const contract = getContract();

    const _results = {};
    for (let candidate of candidates) {
      const data = await contract.getCandidateVotes(candidate.id);
      _results[candidate.name] = data.toNumber();
    }

    setResults(_results);
  }

  useEffect(() => {
    fetchCandidateVotes();

    const interval = setInterval(() => {
      fetchCandidateVotes();
    }, 5000);
    return () => clearInterval(interval);
  }, [candidates]);

  return results;
};

export default useResults;
