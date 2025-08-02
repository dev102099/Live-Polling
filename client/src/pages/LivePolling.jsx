import React, { useState, useEffect } from "react";
import { socket } from "../socket"; // Ensure this path is correct

// --- Helper Icons (as inline SVGs for easy use) ---
const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-red-500 mr-2"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
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
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export default function LivePolling() {
  const [poll, setPoll] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const handleNewPoll = (newPollData) => {
      console.log("Student received new poll:", newPollData);
      setPoll(newPollData);
      setSelectedOptionId(null);
      setIsSubmitted(false);
      setShowResults(false);
      setResults(null);
    };

    const handlePollEnd = (resultsData) => {
      console.log("Student received poll results:", resultsData);
      setResults(resultsData);
      setShowResults(true);
    };

    socket.on("newPoll", handleNewPoll);
    socket.on("pollEnded", handlePollEnd);

    return () => {
      socket.off("newPoll", handleNewPoll);
      socket.off("pollEnded", handlePollEnd);
    };
  }, []);

  // Synchronized Timer Logic
  useEffect(() => {
    if (!poll || !poll.endTime) {
      setTimeLeft(0);
      return;
    }

    const updateTimer = () => {
      const newTimeLeft = Math.round(
        Math.max(0, poll.endTime - Date.now()) / 1000
      );
      setTimeLeft(newTimeLeft);
    };

    updateTimer(); // Update immediately on load
    const timerInterval = setInterval(updateTimer, 1000);

    return () => clearInterval(timerInterval);
  }, [poll]);

  const handleSelectOption = (optionId) => {
    if (!isSubmitted && !showResults) {
      setSelectedOptionId(optionId);
    }
  };

  const handleSubmit = () => {
    if (selectedOptionId === null) {
      alert("Please select an option before submitting.");
      return;
    }
    socket.emit("submit_answer", { optionId: selectedOptionId });
    setIsSubmitted(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  if (!poll) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center p-4 font-sans">
        <h1 className="text-2xl font-semibold text-gray-700">
          Waiting for the teacher to start a poll...
        </h1>
      </div>
    );
  }

  const resultsToDisplay = results ? results.results : {};
  const totalVotes = Object.values(resultsToDisplay).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="bg-white min-h-screen flex items-center justify-center p-4 font-sans relative">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mr-6">Question</h2>
          <div className="flex items-center bg-red-100 text-red-600 font-bold px-4 py-2 rounded-full">
            <ClockIcon />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Poll Container */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-4">
          <div className="bg-gray-800 text-white p-6 rounded-xl mb-4">
            <p className="text-xl font-semibold">{poll.question}</p>
          </div>

          <div className="space-y-3">
            {poll.options.map((option, index) => {
              const isSelected = selectedOptionId === option.id;

              if (showResults) {
                // --- RESULTS VIEW ---
                const voteCount = resultsToDisplay[option.id] || 0;
                const percentage =
                  totalVotes > 0
                    ? ((voteCount / totalVotes) * 100).toFixed(0)
                    : 0;
                const isCorrect = option.id === results.correctOptionId;
                const barColor = isCorrect ? "bg-green-400" : "bg-indigo-400";

                return (
                  <div
                    key={option.id}
                    className="bg-gray-100 rounded-xl p-1 relative h-14 flex items-center"
                  >
                    <div
                      className={`absolute top-0 left-0 h-full ${barColor} rounded-xl transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                    <div className="relative w-full flex items-center justify-between px-4">
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 h-8 w-8 flex items-center justify-center font-bold rounded-full mr-4 ${
                            isCorrect
                              ? "bg-green-500 text-white"
                              : "bg-white text-indigo-600"
                          }`}
                        >
                          {isCorrect ? <CheckIcon /> : index + 1}
                        </div>
                        <span className="font-semibold text-gray-800">
                          {option.text}
                        </span>
                      </div>
                      <span className="font-bold text-lg text-gray-800">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                );
              } else {
                // --- ANSWERING VIEW ---
                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`p-4 border rounded-xl transition-all duration-200 relative overflow-hidden cursor-pointer hover:bg-gray-100 ${
                      isSelected
                        ? "border-indigo-600 ring-2 ring-indigo-600/50"
                        : "border-gray-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <div
                        className={`flex-shrink-0 h-8 w-8 flex items-center justify-center font-bold rounded-full mr-4 ${
                          isSelected
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className="font-semibold">{option.text}</span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* Submit Button (only shown during answering phase) */}
        {!showResults && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleSubmit}
              disabled={isSubmitted || selectedOptionId === null}
              className="px-24 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isSubmitted ? "Submitted" : "Submit"}
            </button>
          </div>
        )}
      </div>

      <button className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-indigo-600 h-16 w-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300">
        <ChatIcon />
      </button>
    </div>
  );
}
