"use client";
import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessageBox from "./ChatMessageBox";
import ChatInput from "./ChatInput";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface ChatBotResponse {
  response: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessageToChatbot = async (
    message: string
  ): Promise<ChatBotResponse> => {
    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        throw new Error("Failed to fectch chatbot response");
      }

      const data = await response.json();
      if (data && typeof data.response === "string") {
        return data as ChatBotResponse;
      } else {
        return {
          response: "Error: Response not in expected format",
        } as ChatBotResponse;
      }
    } catch (error) {
      console.error("Error sending message to chatbot");
      return { response: "Error: Unknown error occurred" } as ChatBotResponse;
    }
  };

  const handleSendMessage = async (message: string) => {
    const newMessage: Message = { sender: "user", text: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const botResponse = await sendMessageToChatbot(newMessage.text);

    const newMessageFromBot: Message = {
      sender: "bot",
      text: botResponse.response,
    };

    setMessages((prevMessages) => [...prevMessages, newMessageFromBot]);

    //setMessage after response comes in or Reply with error
  };

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader />
      <ChatMessageBox messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatBot;
