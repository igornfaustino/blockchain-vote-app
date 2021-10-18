import { ethers } from "ethers";
import Vote from "../artifacts/contracts/Vote.sol/Vote.json";

const voteAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(voteAddress, Vote.abi, provider);

  return contract;
};

export const getSignerContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(voteAddress, Vote.abi, signer);

  return contract;
};

export async function requestAccount() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
}
