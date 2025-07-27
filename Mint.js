
import React, { useState } from 'react';
import { ethers } from 'ethers';

const Mint = () => {
  const [wallet, setWallet] = useState(null);
  const [status, setStatus] = useState('');
  const [mintAmount, setMintAmount] = useState(1);
  const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
  const abi = [ /* Your ABI here */ ];

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWallet(accounts[0]);
    }
  };

  const handleMint = async () => {
    if (!wallet) return setStatus("Please connect wallet first.");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const tx = await nftContract.mint(mintAmount, {
        value: ethers.utils.parseEther((0.1 * mintAmount).toString()) // Adjust if needed
      });
      await tx.wait();
      setStatus("Mint successful!");
    } catch (err) {
      setStatus("Mint failed: " + err.message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Mint Your ClownRiot NFT</h2>
      <button onClick={connectWallet}>Connect Wallet</button><br /><br />
      <input
        type="number"
        value={mintAmount}
        min="1"
        max="5"
        onChange={(e) => setMintAmount(Number(e.target.value))}
      /><br /><br />
      <button onClick={handleMint}>Mint</button>
      <p>{status}</p>
    </div>
  );
};

export default Mint;
