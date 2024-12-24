import React from "react";

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
          <span className="text-xl font-bold text-primary-content">P</span>
        </div>
        <div>
          <h1 className="text-lg font-bold">Polly</h1>
          <p className="text-sm opacity-70">
            Reform Think Tank&apos;s Research Assistant
          </p>
        </div>
      </div>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSdtROaS-LDMFs-iBq2xn4R8aOOKt5gOvdIxqZ-bZg-MO3J6ug/viewform?usp=header"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 text-sm font-medium text-primary-content bg-primary rounded-md hover:bg-primary-focus transition-colors"
      >
        Feedback
      </a>
    </div>
  );
};

export default ChatHeader;
