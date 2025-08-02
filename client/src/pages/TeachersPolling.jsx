import React, { useState } from "react";

import { Sparkles, ChevronDown } from "lucide-react";
import { socket } from "../socket";
import { useNavigate } from "react-router";

export default function TeachersPolling() {
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState([
    { id: 1, text: "Rahul Bajaj", isCorrect: true },
    { id: 2, text: "Rahul Bajaj", isCorrect: false },
  ]);
  const [timeLimit, setTimeLimit] = useState(60);
  const navigate = useNavigate();
  const handleAddOption = () => {
    const newId =
      options.length > 0 ? Math.max(...options.map((o) => o.id)) + 1 : 1;
    setOptions([...options, { id: newId, text: "", isCorrect: false }]);
  };

  const handleOptionTextChange = (id, newText) => {
    setOptions(
      options.map((opt) => (opt.id === id ? { ...opt, text: newText } : opt))
    );
  };

  const handleSetCorrectOption = (id) => {
    setOptions(options.map((opt) => ({ ...opt, isCorrect: opt.id === id })));
  };

  const handleSubmitPoll = (e) => {
    e.preventDefault();
    const pollData = {
      question,
      options,

      timeLimit,
    };

    alert("Submitting poll data: \n" + JSON.stringify(pollData, null, 2));
    socket.emit("createPoll", pollData);
    navigate("/teachers-result");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex justify-center py-12 px-4 font-sans">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm mb-6">
            <Sparkles className="h-4 w-4 text-indigo-500 mr-2" />
            <span className="font-semibold text-sm text-gray-700">
              Intervue Poll
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800">
            Let's Get Started
          </h1>
          <p className="text-lg text-gray-500 mt-2">
            You'll have the ability to create and manage polls, ask questions,
            and monitor your students' responses in real-time.
          </p>
        </div>

        <form
          onSubmit={handleSubmitPoll}
          className="bg-white p-8 rounded-2xl shadow-md border border-gray-200"
        >
          <div className="flex justify-between items-start mb-4">
            <label
              htmlFor="question"
              className="text-lg font-semibold text-gray-800"
            >
              Enter your question
            </label>
            <div className="relative">
              <select
                onChange={(e) => setTimeLimit(parseInt(e.target.value, 10))}
                className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value={60}>60 seconds</option>
                <option value={90}>90 seconds</option>
                <option value={120}>120 seconds</option>
              </select>
              <ChevronDown className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="relative">
            <textarea
              id="question"
              onChange={(e) => setQuestion(e.target.value)}
              maxLength={100}
              className="w-full p-4 bg-gray-100 border border-gray-200 rounded-xl resize-none h-28 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <span className="absolute bottom-3 right-4 text-gray-400 text-sm">
              {question ? question.length : 0}/100
            </span>
          </div>

          <div className="mt-8">
            <label className="text-lg font-semibold text-gray-800 mb-4 block">
              Edit Options
            </label>
            <div className="space-y-4">
              {options.map((option, index) => (
                <div key={option.id} className="flex items-center gap-4">
                  <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center bg-indigo-100 text-indigo-700 font-bold rounded-full">
                    {index + 1}
                  </div>
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) =>
                      handleOptionTextChange(option.id, e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <span className="text-gray-600">Is it Correct?</span>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name={`correct-option-${option.id}`}
                        checked={option.isCorrect}
                        onChange={() => handleSetCorrectOption(option.id)}
                        className="hidden peer"
                      />
                      <span className="peer-checked:text-indigo-600 peer-checked:font-semibold">
                        Yes
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name={`correct-option-${option.id}`}
                        checked={!option.isCorrect}
                        onChange={() => handleSetCorrectOption(option.id)}
                        className="hidden peer"
                      />
                      <span className="peer-checked:text-gray-500">No</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddOption}
            className="mt-6 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-semibold hover:bg-gray-100 hover:border-gray-400 transition-all"
          >
            + Add More option
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
          <button
            type="submit"
            onClick={handleSubmitPoll}
            className={`
              px-12 py-3 rounded-xl text-white font-bold text-lg transition-all duration-300
              bg-gradient-to-r from-purple-600 to-indigo-600
              hover:shadow-xl hover:scale-105
              focus:outline-none focus:ring-4 focus:ring-indigo-300
            `}
          >
            Ask Question
          </button>
        </div>
      </div>
    </div>
  );
}
