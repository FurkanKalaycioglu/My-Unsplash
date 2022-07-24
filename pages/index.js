import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Modal from "./components/Modal";
import InfiniteScroll from "react-infinite-scroll-component";
import { getDocs, collection } from "firebase/firestore";
import { db } from "./api/firebase-config";
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
        <nav className="bg-white border-gray-200 px-2  py-2.5 rounded ">
          <div className="container flex flex-wrap justify-between  items-center mx-auto">
            <a href="/" className="flex items-center ">
              <Image src="/images/logo.svg" width={200} height={50} />
            </a>
            <div className="flex basis-3/4">
              <div className="relative md:block">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <FaSearch className="text-gray-500" />
                  <span className="sr-only">Search icon</span>
                </div>
                <input
                  type="text"
                  id="search-navbar"
                  className="block p-2 pl-10 w-full text-gray-900  rounded-lg border bg-gray-50 "
                  placeholder="Search by name..."
                ></input>
              </div>
            </div>
            <div className="flex">
              <button
                className="focus:outline-none text-white bg-[#3DB46D] font-medium rounded-lg text-md px-5 py-2.5 "
                type="button"
                onClick={() => setShowModal(true)}
              >
                Add a photo
              </button>
            </div>
          </div>
        </nav>

        <div className="pt-8 pr-16 pl-16 pb-8">
          <InfiniteScroll
            className="grid grid-cols-3 gap-8 justify-items-center mx-64 "
            dataLength={data.length}
            next={() => {
              getNext(data[data.length - 1].id).then((datay) => {
                setData([...data, ...datay]);

                console.log(data);
                if (data.length === imagecount) {
                  setHasMore(false);
                }
              });
            }}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {/* find something else other than margin for this problem*/}

            {data.map((item) => (
              <div
                className={
                  "shadow-lg bg-green-100 text-green-500 text-lg font-bold text-center rounded-lg relative" +
                  (item.createdAt.seconds % 2 === 1
                    ? " w-[385px] h-[600px] row-span-2"
                    : " w-[385px] h-[300px]")
                }
              >
                <Image
                  src={item.url}
                  layout="fill"
                  className="rounded-xl object-cover text-white"
                  title={item.label}
                />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </main>
    </div>
  );
}
