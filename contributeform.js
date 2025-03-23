import { useState } from "react";
import { ethers } from "ethers";

const ContributeForm = ({ contractAddress }) => {
  const [amount, setAmount] = useState("");

  const contributeToFund = async () => {
    if (!window.ethereum) return alert("Please install MetaMask");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    try {
      const tx = await signer.sendTransaction({
        to: contractAddress,
        value: ethers.parseEther(amount),
      });

      await tx.wait();
      alert(`Successfully contributed ${amount} ETH!`);
      setAmount(""); // Clear input after transaction
    } catch (error) {
      console.error(error);
      alert("Transaction failed");
    }
  };

  return (
    <div>
      <h2>Contribute to the Fund</h2>
      <input
        type="number"
        placeholder="Enter amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={contributeToFund}>Contribute</button>
    </div>
  );
};

export default ContributeForm;
