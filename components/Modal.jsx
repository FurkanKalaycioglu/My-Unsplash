import React from "react";
import { increment, doc, updateDoc } from "firebase/firestore";
import { db } from "../pages/api/firebase-config";
function Modal({ closeModal }) {
  const sendData = async (event) => {
    event.preventDefault();
    const updateCounter = async () => {
      const counterRef = doc(db, "counter", "c");
      await updateDoc(counterRef, {
        count: increment(1),
      });
    };
    updateCounter();

    const res = await fetch("/api/firebase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: event.target.label.value,
        url: event.target.url.value,
      }),
    });
    const data = await res.json();
    closeModal();
  };
  return (
    <div
      id="defaultModal"
      tabIndex="-1"
      aria-hidden="true"
      className=" overflow-y-auto overflow-x-hidden fixed  z-50 w-full md:inset-0 h-modal  "
    >
      <div className="relative p-4 m-auto pt-16 w-full max-w-2xl h-full md:h-auto ">
        <div className="relative bg-white rounded-lg shadow-2xl">
          <div className="flex justify-between items-start p-4 rounded-t  ">
            <h3 className="text-2xl font-semibold text-gray-900">
              Add a new photo
            </h3>
          </div>
          <div className="p-6 space-y-6 ">
            <form className=" flex flex-col gap-4" onSubmit={sendData}>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#4F4F4F]">
                  Label
                </label>
                <input
                  id="label"
                  type="text"
                  name="label"
                  className="p-4 border w-[550px] h-[50px] rounded-xl border-[#4F4F4F] shadow-lg text-[#BDBDBD] focus:text-black truncate pr-4 "
                  placeholder="Suspendisse elit massa"
                ></input>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#4F4F4F]">
                  Url
                </label>
                <input
                  id="url"
                  type="text"
                  name="url"
                  className="p-4 border w-[550px] h-[50px] rounded-xl border-[#4F4F4F] shadow-lg text-[#BDBDBD] focus:text-black truncate pr-4"
                  placeholder="https://images.unsplash.com/photo-1657493702739-4794de99558a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80"
                ></input>
              </div>
              <div className="flex items-center justify-end p-6 space-x-2 ">
                <button
                  data-modal-toggle="defaultModal"
                  type="button"
                  className="text-[#BDBDBD]  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={() => closeModal(false)}
                >
                  Cancel
                </button>
                <button
                  data-modal-toggle="defaultModal"
                  type="submit"
                  className="text-white bg-[#3DB46D]  rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 w-[105px] h-[55px]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
