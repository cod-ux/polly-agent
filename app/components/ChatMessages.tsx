import React from "react";

interface Props {
  UserMsgs: string[];
  BotMsgs: string[];
}

const ChatMessages = ({ UserMsgs, BotMsgs }: Props) => {
  return (
    <>
      <div className="flex-1 items-center p-2 overflow-y-auto border-2 justify-center w-5/6 mx-auto">
        <div className="w-full h-full border-2 bg-slate-00"></div>
      </div>
    </>
  );
};

export default ChatMessages;
