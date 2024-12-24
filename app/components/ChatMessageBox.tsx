import React, { useEffect, useRef } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface MessageProps {
  messages: Message[];
}

const ChatMessageBox: React.FC<MessageProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    // Small delay to ensure new content is rendered
    setTimeout(() => {
      if (containerRef.current) {
        const container = containerRef.current;
        const targetScroll = container.scrollHeight;
        const startScroll = container.scrollTop;
        const distance = targetScroll - startScroll;
        const duration = 1000; // ms
        const startTime = performance.now();

        const easeOutCubic = (t: number): number => {
          return 1 - Math.pow(1 - t, 3);
        };

        const animateScroll = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = easeOutCubic(progress);
          
          container.scrollTop = startScroll + (distance * easeProgress);

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };

        requestAnimationFrame(animateScroll);
      }
    }, 50); // 50ms delay to ensure content is rendered
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto w-full" ref={containerRef}>
      <div className="container mx-auto py-4 space-y-4">
        {messages.map((message, index) => {
          const isUser = message.sender === "user";
          const chatClassName = isUser ? "chat chat-end" : "chat chat-start";
          const bubbleClassName = isUser
            ? "chat-bubble bg-primary text-primary-content text-base font-medium p-3 max-w-[70%]"
            : "chat-bubble bg-white border border-gray-400 text-black font-medium p-3 max-w-[70%]";

          return (
            <div key={index} className={`${chatClassName} animate-fadeIn px-4`}>
              {isUser ? (
                <div className={bubbleClassName}>{message.text}</div>
              ) : (
                <MarkdownRenderer
                  content={message.text}
                  bubbleClass={bubbleClassName}
                />
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessageBox;
