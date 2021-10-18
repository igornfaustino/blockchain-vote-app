import { useEffect, useState } from "react";
import {
  getContract,
  getSignerContract,
  requestAccount,
} from "../utils/etherUtil";

const useVote = (candidates) => {
  const [remainingVotes, setRemainingVotes] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [expireDate, setExpireDate] = useState(0);

  async function fetchCandidateVotes(id) {
    if (typeof window.ethereum === "undefined") return;

    const contract = getContract();

    try {
      const data = await contract.getCandidateVotes(id);
      console.log({ id, votes: data.toNumber() });
    } catch (err) {
      console.log("Error: ", err);
    }
  }

  async function fetchRemainingVotes() {
    if (typeof window.ethereum === "undefined") return;

    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const contract = getContract();

    const data = await contract.getRemainingVotes(account);
    const remaining = data.toNumber();
    setRemainingVotes(remaining);
  }

  async function fetchTotalVotes() {
    if (typeof window.ethereum === "undefined") return;

    const contract = getContract();

    const data = await contract.getTotalVotes();
    const total = data.toNumber();
    setTotalVotes(total);
  }

  async function fetchExpireDate() {
    if (typeof window.ethereum === "undefined") return;

    const contract = getContract();

    const data = await contract.getExpireDate();
    const expireDate = data.toNumber();

    setExpireDate(new Date(expireDate * 1000).toLocaleString("pt-BR"));
  }

  async function vote(id) {
    if (!id) return;
    if (typeof window.ethereum === "undefined") return;
    await requestAccount();

    const contract = getSignerContract();

    const transaction = await contract.vote(id);
    await transaction.wait();

    candidates.forEach((candidate) => fetchCandidateVotes(candidate.id));
    fetchRemainingVotes();
  }

  useEffect(() => {
    fetchRemainingVotes();
    fetchTotalVotes();
    fetchExpireDate();
  }, []);

  useEffect(() => {
    const contract = getContract();
    contract.on("newVote", (total) => {
      setTotalVotes(total.toNumber());
    });
  });

  useEffect(() => {
    candidates.forEach((candidate) => fetchCandidateVotes(candidate.id));
  }, [candidates]);

  return {
    vote,
    remainingVotes,
    totalVotes,
    expireDate,
  };
};

export default useVote;
