import {
  createGenericFile,
  publicKey,
  PublicKey,
  Signer,
  Transaction,
} from "@metaplex-foundation/umi";

import {
  createBundlrUploader,
  bundlrUploader,
} from "@metaplex-foundation/umi-uploader-bundlr";

import { toMetaplexFile } from "@metaplex-foundation/js";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import base58 from "bs58";
import * as dotenv from "dotenv";
import * as fs from "fs";

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as UmiWeb3Adapters from "@metaplex-foundation/umi-web3js-adapters";

const { connection } = useConnection();
const wallet = useWallet();

dotenv.config();

interface BundlrUploadProps {
  blob: Blob;
}
//NEED TO CONVERT THIS TO UMI FRAMEWORK STYLE THAT IS NEWER

const BundlrUpload = async ({ blob }: BundlrUploadProps) => {
  //UPDATE TO UMI FRAMEWORK

  const umi = createUmi("https://api.devnet.solana.com");

  const arrayBuffer: ArrayBuffer = await blob.arrayBuffer();
  const uint8Array: Uint8Array = new Uint8Array(arrayBuffer);

  // CONTEXT
  // interface Context {
  //     /** An interface for downloading files from URIs. */
  //     downloader: DownloaderInterface;
  //     /** An interface for managing public and private keys. */
  //     eddsa: EddsaInterface;
  //     /** An interface for sending HTTP requests. */
  //     http: HttpInterface;
  //     /** The signer using your app. */
  //     identity: Signer;
  //     /** The signer paying for things, usually the same as the `identity`. */
  //     payer: Signer;
  //     /** An interface for registering and retrieving programs. */
  //     programs: ProgramRepositoryInterface;
  //     /** An interface for sending RPC requests. */
  //     rpc: RpcInterface;
  //     /** An interface for managing transactions. */
  //     transactions: TransactionFactoryInterface;
  //     /** An interface for uploading files and getting their URIs. */
  //     uploader: UploaderInterface;
  // }

  // /** CREATE GENERIC FILE
  //  * Creates a new {@link GenericFile} from a buffer and a file name.
  //  * @category Storage
  //  */
  // createGenericFile: (content: string | Uint8Array, fileName: string, options?: GenericFileOptions) => GenericFile;
  // /**

  //  GENERIC FILE OPTIONS
  //   GenericFileOptions = {
  //     displayName?: string;
  //     uniqueName?: string;
  //     contentType?: string;
  //     extension?: string;
  //     tags?: {
  //         name: string;
  //         value: string;
  //     }[];
  // };

  const genericFile = createGenericFile(uint8Array, "testImage.jpg", {
    displayName: "My Test Image",
    uniqueName: "my-test-image",
    contentType: "image/jpeg",
    extension: ".jpg",
    tags: [{ name: "name", value: "value" }],
  });

  // createGenericFileFromBrowserFile;

  // UPLOADER INTERFACE
  //    interface UploaderInterface {
  //     /** Uploads multiple files and returns their URIs. */
  //     upload: (files: GenericFile[], options?: UploaderUploadOptions) => Promise<string[]>;
  //     /** Uploads a JSON object and returns its URI. */
  //     uploadJson: <T>(json: T, options?: UploaderUploadOptions) => Promise<string>;
  //     /** Gets the price to upload a list of files. */
  //     getUploadPrice: (files: GenericFile[], options?: UploaderGetUploadPriceOptions) => Promise<Amount>;
  // }
  // The options that can be passed when uploading files.
  // type UploaderUploadOptions = {
  //   onProgress?: (percent: number, ...args: any) => void;
  //   signal?: GenericAbortSignal;
  // };

  //CREATE BUNDLER UPLOADER
  // function createBundlrUploader(context: Pick<Context, 'rpc' | 'payer' | 'eddsa'>,
  // options?: BundlrUploaderOptions): BundlrUploader;
  // BUNDLR UPLOADER OPTIONS
  //    type BundlrUploaderOptions = {
  //     address?: string;
  //     timeout?: number;
  //     providerUrl?: string;
  //     priceMultiplier?: number;
  //     payer?: Signer;
  // };

  //NEED A REAL SIGNER TO RUN THE SIGNER PARTS

  // Devnet Bundlr address
  const BUNDLR_ADDRESS = "https://devnet.bundlr.network";
  // Mainnet Bundlr address, uncomment if using mainnet
  // const BUNDLR_ADDRESS = "https://node1.bundlr.network"

  // Connection endpoint, switch to a mainnet RPC if using mainnet
  const ENDPOINT = clusterApiUrl("devnet");
  //if (!wallet.publicKey) throw new Error("DEV_PRIVATE_KEY not found");
  //if (!wallet.signMessage) throw new Error("DEV_PRIVATE_KEY not found");
  //if (!wallet.signTransaction) throw new Error("DEV_PRIVATE_KEY not found");
  //if (!wallet.signAllTransactions) throw new Error("DEV_PRIVATE_KEY not found");

  // const pubKeyString: PublicKey = publicKey(wallet.publicKey.toBase58());

  //const test = UmiWeb3Adapters.fromWeb3JsPublicKey(wallet.publicKey);

  const key = process.env;

  const keypair = Keypair.fromSecretKey(Uint8Array.from(key));

  // interface Signer {
  //     /** The public key of the Signer. */
  //     readonly publicKey: PublicKey;
  //     /** Signs the given message. */
  //     readonly signMessage: (message: Uint8Array) => Promise<Uint8Array>;
  //     /** Signs the given transaction. */
  //     readonly signTransaction: (transaction: Transaction) => Promise<Transaction>;
  //     /** Signs all the given transactions at once. */
  //     readonly signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  // }

  const signer: Signer = {
    publicKey: test,
    signMessage: wallet.signMessage,
    signTransaction: (transaction: Transaction) => Promise<Transaction>,
    signAllTransactions: (transactions: Transaction[]) =>
      Promise<Transaction[]>,
  };

  const bundlerUploaderOptions = {
    address: BUNDLR_ADDRESS,
    timeout: 60000, //number for timeout
    providerUrl: ENDPOINT,
    priceMultiplier: 1, // 1 is standard - this payment multiple is a fee to store data ahead of others
    payer: signer,
  };

  const bundlerUploadTest = createBundlrUploader(umi, bundlerUploaderOptions);

  // UMI extends CONTEXT so UMI is my CONTEXT
  //umi.use(bundlrUploader(bundlerUploaderOptions));

  //COULD MAYBE USE THE URI BUILT IN UPLOADER INSTEAD?
  //const myUri = umi.uploader.upload([genericFile]);
  //above not using bundler

  const myUris = bundlerUploadTest.upload([genericFile]);

  //UPDATE TO UMI FRAMEWORK

  // NFT metadata
  const NFT_NAME = "Golden Ticket";
  const NFT_SYMBOL = "GOLD";
  const NFT_DESCRIPTION =
    "A golden ticket that grants access to loyalty rewards";
  // Set this relative to the root directory
  const NFT_IMAGE_PATH = "nft-upload/pay-logo.svg";
  const NFT_FILE_NAME = "pay-logo.svg";

  async function main() {
    // Get the shop keypair from the environment variable

    const imageBuffer = fs.readFileSync(NFT_IMAGE_PATH);
    const file = toMetaplexFile(imageBuffer, NFT_FILE_NAME);

    const uploadedMetadata = await nfts.uploadMetadata({
      name: NFT_NAME,
      symbol: NFT_SYMBOL,
      description: NFT_DESCRIPTION,
      image: file,
    });

    console.log(`Uploaded metadata: ${uploadedMetadata.uri}`);
  }

  // main()
  //   .then(() => {
  //     console.log("Done!");
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //     process.exit(1);
  //   });
  return <div>BundlrUpload</div>;
};

export default BundlrUpload;
