import Head from "next/head";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./api/firebase-config";
import Modal from "./components/Modal";

import NavBar from "./components/Navbar";
import ImageGallery from "./components/ImageGallery";
import Socials from "./components/Socials";
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [imagecount, setImagecount] = useState(0);
  useEffect(() => {
    const getCount = async () => {
      const querySnapshot = await getDocs(collection(db, "counter"));
      const count = querySnapshot.docs.map((doc) => {
        return {
          count: doc.data().count,
        };
      });
      return count;
    };
    getCount().then((countt) => {
      setImagecount(countt[0].count);
    });

    const getImage = async () => {
      const req = await fetch(`api/firebase?limit=9`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await req.json();
      return data;
    };
    getImage().then((data) => {
      setData(data);
    });
  }, []);
  const getNext = async (docID) => {
    const req = await fetch(`api/firebase?limit=9&docID=${docID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await req.json();
    return data;
  };
  return (
    <div>
      <Head>
        <title>My Unsplash App</title>
        <meta
          name="description"
          content="My Unsplash app for devchallanges.io"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        {showModal ? <Modal closeModal={setShowModal} /> : null}
      </div>
      <main className={showModal ? " opacity-80 " : "bg-white"}>
        {NavBar(showModal, setShowModal)}

        {ImageGallery(
          data,
          setData,
          imagecount,
          setImagecount,
          hasMore,
          setHasMore,
          getNext
        )}
      </main>
      <footer>{Socials()}</footer>
    </div>
  );
}
