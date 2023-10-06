"use client";
import { set } from "@metaplex-foundation/beet";
import { SYSVAR_RECENT_BLOCKHASHES_PUBKEY } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useRef } from "react";

interface CanvasOGProps {
  textObject: {
    customer: string;
    vendor: string;
    description: string;
  };
  setImage: Function;
  setImageSet: Function;
  setBlob: Function;
}

const ReceiptCanvas = ({
  textObject,
  setImage,
  setImageSet,
  setBlob,
  ...rest
}: CanvasOGProps) => {
  const ref = useRef();

  const draw = (aTextObject, context /*,count: number*/) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // const delta = count % 500;
    context.fillStyle = "white";
    context.font = "30px Arial";
    context.fillRect(0, 0, 500, 700);
    context.fillStyle = "black";
    context.fillText(`Customer: ${aTextObject.customer}`, 10 /*+ delta*/, 50);
    context.fillText(`Vendor: ${aTextObject.vendor}`, 10 /*+ delta*/, 100);
    context.fillText(
      `Description: ${aTextObject.description}`,
      10 /*+ delta*/,
      150
    );
  };

  useEffect(() => {
    const theCanvas = ref.current;

    const context = theCanvas.getContext("2d");
    draw(textObject, context);

    // const base64StringDataUrl = theCanvas.toDataURL("image/jpeg", 0.5);

    // localStorage.setItem("image", base64StringDataUrl);

    theCanvas.toBlob(
      (blob: any) => {
        const newImage = document.createElement("img");
        const url = URL.createObjectURL(blob);
        setBlob(blob);
        setImage(url);
      },
      "image/jpeg",
      0.95
    ); // converting to jpeg at 95% quality
    setImageSet(true);

    // setImage(base64StringDataUrl);
    // setImageSet(true);
  }, [textObject]);

  return <canvas className="" ref={ref} {...rest} />;
};

export default ReceiptCanvas;
