import React from "react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface MessageProps {
  messages: Message[];
}

const ChatMessageBox: React.FC<MessageProps> = ({ messages }) => {
  return (
    <>
      <div className="flex-1 items-center p-2 overflow-y-auto border-2 justify-center w-5/6 mx-auto">
        <div className="w-full h-full border-2 bg-slate-00 p-10">
          {messages.map((message, index) => {
            let bubbleClassName = "";

            if (message.sender == "user") {
              bubbleClassName = "chat chat-end";
            } else if (message.sender == "bot") {
              bubbleClassName = "chat chat-start";
            }

            return (
              <div key={index} className={bubbleClassName}>
                <div
                  key={index}
                  className="chat-bubble chat-bubble-primary text-blue-100"
                >
                  {message.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ChatMessageBox;
