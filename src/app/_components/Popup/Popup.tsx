import { Component } from "react";

interface Props {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup = ({ title, onClose, children }: Props) => {
  return (
    <div className="z-10 fixed top-0 left-0 w-screen h-screen bg-gray-300/40 backdrop-blur flex items-center justify-center transition-all">
      <div className="bg-white p-8 w-[80%] lg:w-[45%] rounded-lg max-h-[80%] overflow-x-auto">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold uppercase text-gray-700">{title}</h1>
          <button onClick={onClose} className="text-red-500 hover:text-red-700" type="button">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Zavrit</title>
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <hr className="m-4" />

        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
