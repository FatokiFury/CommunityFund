import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import ContributeForm from "./ContributeForm";

const contractAddress = "0xAd6347b6F1927A34D2E1fD6114a7048207Ad6503"; // Replace this with your actual contract address
const abi = [  
  {
    "constant": true,
    "inputs": [],
    "name": "getBalance",
    "outputs": [{ "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]; 

function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState("0");

  // Connect wallet function
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setWalletAddress(await signer.getAddress());
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      alert("Please install MetaMask to use this feature!");
    }
  };

  // Fetch contract balance
  const getContractBalance = async () => {
    if (!window.ethereum) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider);
      const balanceWei = await contract.getBalance();
      setBalance(ethers.formatEther(balanceWei)); // Convert from wei to ETH
    } catch (error) {
      console.error("Error fetching contract balance:", error);
    }
  };

  useEffect(() => {
    getContractBalance();
  }, []);

  return (
    <div className="container">
      <h1>Community Fund</h1>
      <button onClick={connectWallet} className="wallet-button">
        {walletAddress ? "Connected" : "Connect Wallet"}
      </button>
      {walletAddress && <p>Wallet: {walletAddress}</p>}
      <h3>Contract Balance: {balance} ETH</h3>

      {/* Contribution Form */}
      <ContributeForm contractAddress={contractAddress} />
    </div>
  );
}

export default App;
