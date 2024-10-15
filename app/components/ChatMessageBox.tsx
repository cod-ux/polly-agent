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
      <div className="flex-1 items-center p-2 overflow-y-auto border-8 justify-center w-5/6 mx-auto">
        <div className="w-full h-full p-10">
          {messages.map((message, index) => {
            let chatClassName = "";
            let bubbleClassName = "";

            if (message.sender == "user") {
              chatClassName = "chat chat-end p-2";
              bubbleClassName = "chat-bubble chat-bubble-primary";
            } else if (message.sender == "bot") {
              chatClassName = "chat chat-start p-2";
              bubbleClassName = "chat-bubble chat-bubble-primary";
            }

            return (
              <div key={index} className={chatClassName}>
                <div key={index} className={bubbleClassName}>
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
