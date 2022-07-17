import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";
export default async function handler(req, res) {
  if (req.method === "POST") {
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
  if (req.method === "GET") {
    const querySnapshot = await getDocs(collection(db, "images"));
    const data = querySnapshot.docs.map((doc) => {
      return {
        label: doc.data().label,
        url: doc.data().url,
        id: doc.id,
      };
    });
    res.status(200).json(data);
  }
}
