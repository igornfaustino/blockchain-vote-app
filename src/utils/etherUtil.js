import { ethers } from "ethers";
import Vote from "../artifacts/contracts/Vote.sol/Vote.json";

const voteAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";

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
