import { FaSearch } from "react-icons/fa";
import Image from "next/image";

function NavBar(showModal,setShowModal) {
    return (
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
    );
  }

export default NavBar;