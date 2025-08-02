import React from "react";

const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-indigo-500 mr-2"
  >
    <path d="M12 3L9.25 8.75L3.5 9.5L8.5 14.25L7 20L12 17L17 20L15.5 14.25L20.5 9.5L14.75 8.75L12 3z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

const ChatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export default function WaitingPage() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4 font-sans relative">
      {/* Centered Content */}
      <div className="flex flex-col items-center">
        {/* Header Pill */}
        <div className="inline-flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm mb-8">
          <SparklesIcon />
          <span className="font-semibold text-sm text-gray-700">
            Intervue Poll
          </span>
        </div>

        {/* Animated Spinner */}
        <div className="mb-6">
          <svg
            className="animate-spin h-16 w-16 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>

        {/* Waiting Text */}
        <p className="text-2xl font-semibold text-gray-700">
          Wait for the teacher to ask questions..
        </p>
      </div>

      {/* Floating Chat Button */}
      <button
        className="
          fixed bottom-8 right-8 
          bg-gradient-to-r from-purple-600 to-indigo-600 
          h-16 w-16 rounded-full 
          flex items-center justify-center 
          shadow-lg hover:shadow-xl hover:scale-105 
          transition-all duration-300
          focus:outline-none focus:ring-4 focus:ring-indigo-300
        "
      >
        <ChatIcon />
      </button>
    </div>
  );
}
