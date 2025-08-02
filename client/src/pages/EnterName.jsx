import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setUserName } from "../redux/UserSlice";
import { Sparkles } from "lucide-react";

export default function EnterName() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userData);

  const handleContinue = (e) => {
    e.preventDefault();
    if (name) {
      alert(`Joining with name: ${name}`);
      dispatch(setUserName(name));
      if (userData.role === "teacher") {
        navigate("/teachers-polling");
      } else if (userData.role === "student") {
        navigate("/live-poll");
      }
    } else {
      alert("Please enter your name to continue.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center">
        <div className="inline-flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm mb-8">
          <Sparkles className="h-4 w-4 text-indigo-500 mr-2" />
          <span className="font-semibold text-sm text-gray-700">
            Intervue Poll
          </span>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Let's Get Started
          </h1>
          <p className="text-lg text-gray-500 max-w-md mx-auto">
            If you're a student, you'll be able to{" "}
            <strong className="font-semibold text-gray-700">
              submit your answers
            </strong>
            , participate in live polls, and see how your responses compare with
            your classmates
          </p>
        </div>

        <form
          onSubmit={handleContinue}
          className="w-full max-w-sm flex flex-col items-center"
        >
          <div className="w-full mb-8">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              placeholder="e.g., Jane Doe"
            />
            {console.log(name)}
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className={`
              px-20 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300
              bg-gradient-to-r from-purple-600 to-indigo-600
              hover:shadow-xl hover:scale-105
              focus:outline-none focus:ring-4 focus:ring-indigo-300
              disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none
            `}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
