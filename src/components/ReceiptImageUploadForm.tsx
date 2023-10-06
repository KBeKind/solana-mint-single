"use client";

import { useState } from "react";

interface ReceiptImageUploaderProps {
  setFile: Function;
  file: File;
}

export function ReceiptImageUploadForm() {
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <button className="my-4 center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
        Upload Image
      </button>
    </form>
  );
}

export default ReceiptImageUploadForm;
