import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

import {
  createBundlrUploader,
  BundlrUploader,
} from "@metaplex-foundation/umi-uploader-bundlr";

import {file}

import { Connection, clusterApiUrl } from "@solana/web3.js";

interface ClientUploadProps {
  blob: Blob;
}

const ClientUpload = ({ blob }: ClientUploadProps) => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  const umi = createUmi(clusterApiUrl("devnet"));

  const bundlrUploader = createBundlrUploader({
    apiKey: "YOUR_API_KEY",
    network: "solana",
  });

  const initializeUpload = async () => {
    const file = new File([blob], "my-nft.jpg");
  };

  return (
    <div className="m-4">
      <button
        onClick={initializeUpload}
        className="my-4 center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
      >
        Upload Image
      </button>
    </div>
  );
};

export default ClientUpload;
