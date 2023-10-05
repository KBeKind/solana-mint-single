"use client";

import React from "react";
import ReceiptForm from "../components/ReceiptForm";
import ReceiptCanvas from "../components/ReceiptCanvas";
import { useState } from "react";
import Link from "next/link";
import ReceiptImageUploader from "../components/ReceiptImageUploader";

const Home = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [textObject, setTextObject] = useState({
    customer: "Alice",
    vendor: "Sol Products Inc",
    description: "Software Engineer",
  });
  const [imageSet, setImageSet] = useState(false);
  const [image, setImage] = useState();
  const [blob, setBlob] = useState();
  const [file, setFile] = useState<File>();

  // passing two callback functions into RecieptForm
  return (
    <div>
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
      <div>
        <ReceiptImageUploader setFile={setFile} file={file} />
      </div>
    </div>
  );
};

export default Home;
