import { useEffect, useState } from "react";
import {
  getContract,
  getSignerContract,
  requestAccount,
} from "../utils/etherUtil";

const useVote = () => {
  const [remainingVotes, setRemainingVotes] = useState(0);

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

  async function vote(id) {
    if (!id) return;
    if (typeof window.ethereum === "undefined") return;
    await requestAccount();

    const contract = getSignerContract();

    const transaction = await contract.vote(id);
    await transaction.wait();

    fetchRemainingVotes();
  }

  useEffect(() => {
    fetchRemainingVotes();
  }, []);

  return {
    vote,
    remainingVotes,
  };
};

export default useVote;
