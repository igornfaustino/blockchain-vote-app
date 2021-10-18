import "./App.css";
import { ethers } from "ethers";
import Vote from "./artifacts/contracts/Vote.sol/Vote.json";
import { useEffect, useState } from "react";

const voteAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(voteAddress, Vote.abi, provider);

  return contract;
};

const getSignerContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(voteAddress, Vote.abi, signer);

  return contract;
};

function App() {
  const [candidates, setCandidates] = useState([]);
  const [remainingVotes, setRemainingVotes] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [expireDate, setExpireDate] = useState(0);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

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
    fetchTotalVotes();
  }

  useEffect(() => {
    fetchCandidates();
    fetchRemainingVotes();
    fetchTotalVotes();
    fetchExpireDate();

    return setInterval(() => {
      fetchTotalVotes();
    }, 5000);
  }, []);

  useEffect(() => {
    candidates.forEach((candidate) => fetchCandidateVotes(candidate.id));
  }, [candidates]);

  return (
    <div className="App">
      <header className="App-header">
        <p>{expireDate}</p>
        <p>total: {totalVotes}</p>
        <p>remaining: {remainingVotes}</p>
        <hr />
        {candidates.map((candidate) => (
          <p key={candidate.id} onClick={() => vote(candidate.id)}>
            {candidate.name}
          </p>
        ))}
      </header>
    </div>
  );
}

export default App;
