import React, { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="flex justify-center items-center p-2 mb-10 mt-3 gap-1">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyPress}
          className="p-2 border-2 rounded-lg w-5/12 h-10.5"
          placeholder="Ask me anything..."
        ></input>
        <button onClick={handleSendMessage} className="btn btn-primary px-3">
          Send
        </button>
      </div>
    </>
  );
};

export default ChatInput;
