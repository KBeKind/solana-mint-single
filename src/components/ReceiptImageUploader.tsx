import { _fetchData } from "@ethersproject/web";
import { setAndVerifyCollectionInstructionDiscriminator } from "@metaplex-foundation/mpl-token-metadata";
import React from "react";

interface ReceiptImageUploaderProps {
  setFile: Function;
  file: File;
}

const ReceiptImageUploader = ({ setFile, file }: ReceiptImageUploaderProps) => {



const onSubmit = async function(e: React.FormEvent<HTMLFormElement>) {
 e.preventDefault()

 if(!file) return

try {
  const data = new FormData()
  data.set("file", file)
  const res = await fetch('/api/upload', {
    method: "POST",
    body: data
  })
// handle errors
if (!res.ok) throw new Error(await res.text())
} catch (e:any) {
  // further handle errors here
  console.log(e)
}



}

}



  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.(0))}
        />
        <button className="my-4 center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default ReceiptImageUploader;
