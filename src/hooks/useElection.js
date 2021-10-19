import { useEffect, useState } from "react";
import { getContract } from "../utils/etherUtil";

const useElection = () => {
  const [totalVotes, setTotalVotes] = useState(0);
  const [expireDate, setExpireDate] = useState(0);

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

  useEffect(() => {
    fetchTotalVotes();
    fetchExpireDate();

    const contract = getContract();
    contract.on("newVote", (total) => {
      setTotalVotes(total.toNumber());
    });
  }, []);

  return { totalVotes, expireDate };
};

export default useElection;
