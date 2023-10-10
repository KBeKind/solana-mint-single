import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

import {
  createGenericFile,
  PublicKey,
  publicKey,
  Signer,
  Transaction,
} from "@metaplex-foundation/umi";
import { clusterApiUrl } from "@solana/web3.js";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";
import { sign } from "crypto";
import * as UmiWeb3Adapters from "@metaplex-foundation/umi-web3js-adapters";

import {
  walletAdapterIdentity,
  WalletAdapter,
  createSignerFromWalletAdapter,
} from "@metaplex-foundation/umi-signer-wallet-adapters";

//const { connection } = useConnection();
const wallet = useWallet();

interface BundlrUploadProps {
  blob: Blob;
}

const BundlrUpload = async ({ blob }: BundlrUploadProps) => {
  //UPDATE TO UMI FRAMEWORK

  const umi = createUmi("https://api.devnet.solana.com");

  const arrayBuffer: ArrayBuffer = await blob.arrayBuffer();
  const uint8Array: Uint8Array = new Uint8Array(arrayBuffer);

  const genericFile = createGenericFile(uint8Array, "testImage.jpg", {
    displayName: "My Test Image",
    uniqueName: "my-test-image",
    contentType: "image/jpeg",
    extension: ".jpg",
    tags: [{ name: "name", value: "value" }],
  });

  // Devnet Bundlr address
  const BUNDLR_ADDRESS = "https://devnet.bundlr.network";
  // Mainnet Bundlr address, uncomment if using mainnet
  // const BUNDLR_ADDRESS = "https://node1.bundlr.network"

  // Connection endpoint, switch to a mainnet RPC if using mainnet
  const ENDPOINT = clusterApiUrl("devnet");

  if (!wallet.publicKey) throw new Error("DEV_PRIVATE_KEY not found");
  if (!wallet.signMessage) throw new Error("DEV_PRIVATE_KEY not found");
  if (!wallet.signTransaction) throw new Error("DEV_PRIVATE_KEY not found");
  if (!wallet.signAllTransactions) throw new Error("DEV_PRIVATE_KEY not found");

  //   const signTransaction = wallet.signTransaction
  //   const signAllTransactions = wallet.signAllTransactions
  //   const pubKeyString: PublicKey = publicKey(wallet.publicKey.toBase58());

  // const signer: Signer = {
  //   publicKey: pubKeyString,
  //   signMessage: wallet.signMessage,
  //   signTransaction:
  //   signAllTransactions:
  // };

  const umiWallet: WalletAdapter = {
    publicKey: wallet.publicKey,
    signMessage: wallet.signMessage,
    signTransaction: wallet.signTransaction,
    signAllTransactions: wallet.signAllTransactions,
  };
  const signer: Signer = createSignerFromWalletAdapter(umiWallet);

  const bundlerUploaderOptions = {
    address: BUNDLR_ADDRESS,
    timeout: 60000, //number for timeout
    providerUrl: ENDPOINT,
    priceMultiplier: 1, // 1 is standard - this payment multiple is a fee to store data ahead of others
    payer: signer,
  };

  const bundlerUploadTest = createBundlrUploader(umi, bundlerUploaderOptions);

  return <div>BundlrUpload</div>;
};

export default BundlrUpload;
