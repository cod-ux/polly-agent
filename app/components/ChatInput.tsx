import React from "react";
import send from "./send.png";

const ChatInput = () => {
  return (
    <>
      <div className="flex justify-center items-center p-2 mb-10 mt-3 gap-1">
        <input className="p-2 border-2 rounded-lg w-5/12 h-10.5"></input>
        <button className="btn btn-primary px-2 h-10 bg-send-icon"></button>
      </div>
    </>
  );
};

export default ChatInput;
