import Head from "next/head";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
export default function Home() {
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

      <main>
        <nav class="bg-white border-gray-200 px-2  py-2.5 rounded ">
          <div class="container flex flex-wrap justify-between  items-center mx-auto">
            <a href="/" class="flex items-center ">
              <Image src="/images/logo.svg" width={200} height={50} />
            </a>
            <div class="flex basis-3/4">
              <div class="relative md:block">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <FaSearch className="text-gray-500" />
                  <span class="sr-only">Search icon</span>
                </div>
                <input
                  type="text"
                  id="search-navbar"
                  class="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border "
                  placeholder="Search by name..."
                ></input>
              </div>
            </div>
            <div className="flex">
              <button
                type="button"
                class="focus:outline-none text-white bg-[#3DB46D] font-medium rounded-lg text-md px-5 py-2.5  "
              >
                Add a photo
              </button>
            </div>
          </div>
        </nav>
      </main>
    </div>
  );
}
