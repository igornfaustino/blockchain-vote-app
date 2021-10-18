import { useEffect, useState } from "react";
import { getContract } from "../utils/etherUtil";

const useCandidates = () => {
  const [candidates, setCandidates] = useState([]);

  async function fetchCandidates() {
    if (typeof window.ethereum === "undefined") return;

    const contract = getContract();

    try {
      const data = await contract.getCandidates();
      const candidates = data.map((candidate) => ({
        id: candidate.id.toNumber(),
        name: candidate.name,
      }));
      setCandidates(candidates);
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  useEffect(() => {
    fetchCandidates();
  }, []);

  return candidates;
};

export default useCandidates;
