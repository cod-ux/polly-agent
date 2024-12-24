import React from "react";

const LoadingMessage = () => {
  return (
    <div className="flex items-start space-x-2 animate-pulse p-4">
      <div className="w-8 h-8 rounded-full bg-primary/20"></div>
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-primary/20 rounded w-3/4"></div>
        <div className="h-4 bg-primary/20 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default LoadingMessage;
