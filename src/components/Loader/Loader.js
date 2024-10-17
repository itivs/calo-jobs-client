import React from "react";

export default function Loader({ children, isLoading = true }) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-light-off-white bg-opacity-90 z-50 ${
        isLoading ? "visible" : "hidden"
      }`}
    >
      {isLoading && (
        <div className="w-20 h-20 border-t-4 border-blue-500 border-solid border-r-4 rounded-full animate-spin" />
      )}
      {children}
    </div>
  );
}
