// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { firebaseConfig } from "./firebase-config";

const test = firebaseConfig.apiKey.toString();
export default function handler(req, res) {
  res.status(200).json({ name: test + " from hello.js" });
}
