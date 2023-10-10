"use client";

import React from "react";
import ReceiptForm from "@/components/ReceiptForm";
import ReceiptCanvas from "@/components/ReceiptCanvas";
import { useState, useEffect } from "react";
import Link from "next/link";
import ReceiptImageUploadForm from "@/components/ReceiptImageUploadForm";
import ClientUpload from "@/components/ClientUpload";
import BundlrUpload from "@/app/BundlrUpload";

import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const Home = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [textObject, setTextObject] = useState({
    customer: "",
    vendor: "",
    description: "",
  });
  const [imageSet, setImageSet] = useState(false);
  const [image, setImage] = useState();
  const [blob, setBlob] = useState();
  const [file, setFile] = useState<File>();

  // passing two callback functions into RecieptForm
  return (
    <div>
      <div className="mx-5">
        <WalletMultiButton />
        <WalletDisconnectButton />
        <br />
        <hr />
        <br />
      </div>
      page
      <ReceiptForm
        setFormSubmitted={setFormSubmitted}
        setTextObject={setTextObject}
      />
      <div className="hidden">
        {formSubmitted && (
          <ReceiptCanvas
            textObject={textObject}
            setImage={setImage}
            setImageSet={setImageSet}
            setBlob={setBlob}
            width="700"
            height="500"
          />
        )}
      </div>
      <br />
      <div className="bg-slate-500 p-8">
        {imageSet && <img src={image} width="700" height="500"></img>}
      </div>
      <div></div>
    </div>
  );
};
<BundlrUpload blob={blob} />;
export default Home;
