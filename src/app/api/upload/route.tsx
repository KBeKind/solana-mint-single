import { NextApiRequest, NextApiResponse } from "next";
import { bundlrStorage, toMetaplexFile } from "@metaplex-foundation/js";
import FormDa

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the image file or blob from the request.
  const image = req.files?.[0];

  // Convert the image file or blob to a MetaplexFile object.
  const metaplexFile = toMetaplexFile(image.buffer, image.name);

  // Upload the MetaplexFile object to Arweave using Metaplex's bundlrStorage.
  const arweaveUri = await bundlrStorage.upload(metaplexFile);

  // Return the Arweave URI to the client.
  res.status(200).json({ arweaveUri });
}

export default handler;
