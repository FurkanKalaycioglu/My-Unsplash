import {
  getDoc,
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
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
      createdAt: new Date(),
    });
    res
      .status(200)
      .json({ label: `${body.label}`, url: `${body.url}`, id: `${docRef.id}` });
  }
  if (req.method === "GET") {
    const qu = req.query;
    if (qu.docID) {
      const id = qu.docID;
      const max = qu.limit;

      const idquery = query(
        collection(db, "images"),
        where("__name__", "==", id)
      );

      const documentSnapshots = await getDocs(idquery);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      const next = query(
        collection(db, "images"),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(max)
      );
      const querySnapshot = await getDocs(next);
      const data = querySnapshot.docs.map((doc) => {
        return {
          label: doc.data().label,
          url: doc.data().url,
          id: doc.id,
        };
      });
      res.status(200).json(data);
    } else {
      const max = qu.limit;
      const q = query(
        collection(db, "images"),
        orderBy("createdAt", "desc"),
        limit(max)
      );
      const querySnapshot = await getDocs(q);
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
}
