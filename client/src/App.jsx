import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { setRole } from "./redux/UserSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { socket } from "./socket";

export default function App() {
  useEffect(() => {
    socket.on("connect", (socket) => {
      console.log(" connected");
    });
  }, []);

  const [selectedRole, setSelectedRole] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleContinue = () => {
    if (selectedRole) {
      alert(`Continuing as: ${selectedRole}`);
      socket.emit("role", selectedRole);
      dispatch(setRole(selectedRole));
      navigate("/details");
    } else {
      alert("Please select a role to continue.");
    }
  };

  const RoleCard = ({ role, title, description, isSelected, onSelect }) => {
    return (
      <div
        onClick={() => onSelect(role)}
        className={`
          p-6 border rounded-xl cursor-pointer transition-all duration-300 w-full md:w-80
          ${
            isSelected
              ? "border-indigo-600 shadow-lg ring-2 ring-indigo-600/50"
              : "border-gray-300 bg-white hover:border-gray-400 hover:shadow-md"
          }
        `}
      >
        <h3 className="font-bold text-lg text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2 text-sm">{description}</p>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        {/* Header Pill */}
        <div className="inline-flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm mb-8">
          <Sparkles className="h-4 w-4 text-indigo-500 mr-2" />
          <span className="font-semibold text-sm text-gray-700">
            Intervue Poll
          </span>
        </div>

        {/* Main Title and Subtitle */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Welcome to the Live Polling System
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Please select the role that best describes you to begin using the
            live polling system
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="flex flex-col md:flex-row gap-6 mb-10 w-full justify-center">
          <RoleCard
            role="student"
            title="I'm a Student"
            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
            isSelected={selectedRole === "student"}
            onSelect={setSelectedRole}
          />
          <RoleCard
            role="teacher"
            title="I'm a Teacher"
            description="Submit answers and view live poll results in real-time."
            isSelected={selectedRole === "teacher"}
            onSelect={setSelectedRole}
          />
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedRole}
          className={`
            px-16 py-4 rounded-xl text-white font-bold text-lg transition-all duration-300
            bg-gradient-to-r from-purple-600 to-indigo-600
            hover:shadow-xl hover:scale-105
            focus:outline-none focus:ring-4 focus:ring-indigo-300
            disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none
          `}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
