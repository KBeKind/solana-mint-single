import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import React from "react";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const MintTokenTest = () => {
  // async function createToken() {
  //     const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);
  //     await connection.confirmTransaction(fromAirdropSignature);

  //     // Create new token mint
  //     mint = await createMint(
  //         connection,
  //         fromWallet,
  //         fromWallet.publicKey,
  //         null,
  //         9 // 9 here means we have a decmial of 9 0's
  //     );
  //     console.log(`Create token: ${mint.toBase58()}`);

  //     // Get the token account of the fromWallet address, and if it does not exist, create it
  //     fromTokenAccount = await getOrCreateAssociatedTokenAccount(
  //         connection,
  //         fromWallet,
  //         mint,
  //         fromWallet.publicKey
  //     );
  //     console.log(`Create Token Account: ${fromTokenAccount.address.toBase58()}`);
  // }

  return (
    <div>
      <p className="text-2xl">MintTokenTest page</p>
      <div className="text-center">
        <p className="mt-8 text-3xl">Mint Token Section</p>
        <hr className="m-5" />
        <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Token
        </button>
        <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Mint Token
        </button>
        <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Check Balance
        </button>
        <button className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Send Token
        </button>
      </div>
    </div>
  );
};

export default MintTokenTest;
