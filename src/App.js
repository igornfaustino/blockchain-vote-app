import logo from "./logo.svg";
import "./App.css";
import { ethers } from "ethers";
import Vote from "./artifacts/contracts/Vote.sol/Vote.json";
import { useEffect, useState } from "react";

const voteAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

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

  async function vote(id) {
    if (!id) return;
    if (typeof window.ethereum === "undefined") return;
    await requestAccount();

    const contract = getSignerContract();

    const transaction = await contract.vote(id);
    await transaction.wait();

    candidates.forEach((candidate) => fetchCandidateVotes(candidate.id));
  }

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    candidates.forEach((candidate) => fetchCandidateVotes(candidate.id));
  }, [candidates]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

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
