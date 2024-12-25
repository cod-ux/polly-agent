"use client";
import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessageBox from "./ChatMessageBox";
import ChatInput from "./ChatInput";
import LoadingMessage from "./LoadingMessage";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface ChatBotResponse {
  response: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessageToChatbot = async (
    message: string
  ): Promise<ChatBotResponse> => {
    try {
      // Get the last 4 messages and add the current message to make it 5 total
      const previousMessages = messages.slice(-4).map((msg) => ({
        sender: msg.sender,
        msg: msg.text,
      }));
      const allMessages = [
        ...previousMessages,
        { sender: "user", msg: message },
      ];

      const response = await fetch("http://0.0.0.0:8000/api/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allMessages),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific error cases from Django backend
        if (response.status === 400) {
          console.error("API Error:", data.error);
          return {
            response: `Error: ${data.error}`,
          } as ChatBotResponse;
        }
        throw new Error("Failed to fetch chatbot response");
      }

      if (data && typeof data.response === "string") {
        return data as ChatBotResponse;
      } else {
        return {
          response: "Error: Response not in expected format",
        } as ChatBotResponse;
      }
    } catch (error) {
      console.error("Error sending message to chatbot:", error);
      return {
        response: "Error: Failed to communicate with the chatbot service",
      } as ChatBotResponse;
    }
  };

  const handleSendMessage = async (message: string) => {
    const newMessage: Message = { sender: "user", text: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsLoading(true);

    const botResponse = await sendMessageToChatbot(newMessage.text);
    setIsLoading(false);

    const newMessageFromBot: Message = {
      sender: "bot",
      text: botResponse.response,
    };

    setMessages((prevMessages) => [...prevMessages, newMessageFromBot]);
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-full overflow-x-hidden">
      <ChatHeader />
      <ChatMessageBox messages={messages} />
      {isLoading && <LoadingMessage />}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatBot;
