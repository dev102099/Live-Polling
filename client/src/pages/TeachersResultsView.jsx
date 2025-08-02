import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { socket } from "../socket"; // Ensure this path is correct

// --- Helper Icons ---
const EyeIcon = () => (
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
    className="mr-2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
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

// --- Main Component ---
export default function TeacherResultsView() {
  const [poll, setPoll] = useState(null);
  const [liveResults, setLiveResults] = useState({});
  const [finalResults, setFinalResults] = useState(null);
  const [isPollActive, setIsPollActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // --- Ask the server for the current poll state when the component loads ---
    socket.emit("get_current_poll");

    // --- Socket Event Listeners ---
    const handleCurrentPoll = (currentPollData) => {
      console.log("Received current poll data:", currentPollData);
      setPoll(currentPollData);
      setIsPollActive(currentPollData.isActive);
    };

    const handleUpdateResults = (updatedVoteCounts) => {
      console.log("Teacher received live results update:", updatedVoteCounts);
      setLiveResults(updatedVoteCounts);
    };

    const handlePollEnd = (finalResultsData) => {
      console.log("Teacher received final poll results:", finalResultsData);
      setFinalResults(finalResultsData);
      setLiveResults(finalResultsData.results); // Lock in the final counts
      setIsPollActive(false);
    };

    // Set up all listeners
    socket.on("current_poll_data", handleCurrentPoll);
    socket.on("update_results", handleUpdateResults);
    socket.on("pollEnded", handlePollEnd);

    // Cleanup function to remove listeners
    return () => {
      socket.off("current_poll_data", handleCurrentPoll);
      socket.off("update_results", handleUpdateResults);
      socket.off("pollEnded", handlePollEnd);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleAskNewQuestion = () => {
    navigate("/teachers-polling");
  };

  const resultsToDisplay = finalResults ? finalResults.results : liveResults;
  const totalVotes = Object.values(resultsToDisplay).reduce(
    (sum, count) => sum + count,
    0
  );

  if (!poll) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center p-4 font-sans">
        <h1 className="text-2xl font-semibold text-gray-700">
          No active poll.
        </h1>
        <button
          onClick={handleAskNewQuestion}
          className="mt-4 px-8 py-3 rounded-xl text-white font-bold text-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl"
        >
          + Ask a new question
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen p-8 font-sans relative">
      <header className="flex justify-end mb-12">
        <button className="flex items-center px-6 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg">
          <EyeIcon /> View Poll history
        </button>
      </header>

      <main className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Question
        </h2>

        <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-lg p-4">
          <div className="bg-gray-800 text-white p-6 rounded-xl mb-4">
            <p className="text-xl font-semibold">{poll.question}</p>
          </div>

          <div className="space-y-3">
            {poll.options.map((option, index) => {
              const voteCount = resultsToDisplay[option.id] || 0;
              const percentage =
                totalVotes > 0
                  ? ((voteCount / totalVotes) * 100).toFixed(0)
                  : 0;

              const isCorrect =
                finalResults && option.id === finalResults.correctOptionId;
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
                        {index + 1}
                      </div>
                      <span
                        className={`font-semibold ${
                          isCorrect ? "text-gray-900" : "text-gray-800"
                        }`}
                      >
                        {option.text}
                      </span>
                    </div>
                    <span className="font-bold text-lg text-gray-800">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleAskNewQuestion}
            disabled={isPollActive}
            className="px-8 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + Ask a new question
          </button>
        </div>
      </main>

      <button className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-indigo-600 h-16 w-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl">
        <ChatIcon />
      </button>
    </div>
  );
}
