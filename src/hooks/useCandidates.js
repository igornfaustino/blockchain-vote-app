import { useEffect, useState } from "react";
import { getContract } from "../utils/etherUtil";

const useCandidates = () => {
  const [candidates, setCandidates] = useState([]);

  async function fetchCandidates() {
    if (typeof window.ethereum === "undefined") return;

    const contract = getContract();

    const numCandidates = (await contract.getNumOfCandidates()).toNumber();

    const candidates = [];
    for (let i = 0; i < numCandidates; i++) {
      const candidate = await contract.getCandidate(i);
      candidates.push({
        id: candidate.id.toNumber(),
        name: candidate.name,
      });
    }

    setCandidates(candidates);
  }

  useEffect(() => {
    fetchCandidates();

    const contract = getContract();
    contract.on("newCandidate", (total) => {
      fetchCandidates();
    });
  }, []);

  return candidates;
};

export default useCandidates;
