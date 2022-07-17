import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase-config";
export default async function handler(req, res) {
  const body = req.body;
  if (!body.label || !body.url) {
    return res.status(500).json({ msg: "label or url was not found" });
  }

  const docRef = await addDoc(collection(db, "images"), {
    label: body.label,
    url: body.url,
  });

  res
    .status(200)
    .json({ label: `${body.label}`, url: `${body.url}`, id: `${docRef.id}` });
}
