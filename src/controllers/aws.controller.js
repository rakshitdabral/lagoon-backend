import { generatePreSignedUrl } from "../utils/s3.js";


export const uploadResume = async (req, res) => {
  const url = await generatePreSignedUrl();
  res.status(200).json({ url })
};
