📊 Live Polling System
A real-time, interactive polling application designed for classroom environments. Teachers can create live polls and students can respond in real time. Built as part of the SDE Intern assignment for Intervue.io.

✨ Features
👩‍🏫 Teacher Features
Create Polls: Easily create questions with multiple-choice options.

Set Time Limits: Configure specific time limits for each poll.

Live Results: View responses in real-time as students answer.

Control Flow: Only one poll can run at a time — ensures a structured session.

🎓 Student Features
Join Session: Enter a name and join a live classroom session.

Answer Polls: Select and submit answers within the time limit.

View Results: See aggregated results after each poll concludes.

🛠️ Technology Stack
🖥️ Frontend
React: Declarative UI library for building the interface.

Redux Toolkit: Centralized state management.

React Router: Client-side routing and navigation.

Socket.io Client: Real-time communication over WebSockets.

Tailwind CSS: Utility-first CSS framework for rapid UI development.

🌐 Backend
Node.js: JavaScript runtime environment.

Express.js: Lightweight and flexible server framework.

Socket.io: Real-time, bidirectional, event-based communication.

🚀 Getting Started
✅ Prerequisites
Node.js (v14 or later)

npm or yarn

🧩 Project Structure
The project is split into two folders:

client – React frontend

server – Express backend

You will need to run them in two separate terminal windows.

🛠️ Setup & Installation

1. Clone the Repository
   git clone https://github.com/your-username/live-polling-system.git
   cd live-polling-system

2. Start the Backend Server
   cd server
   npm install
   npm run dev

# Server runs on http://localhost:3002

3. Start the Frontend Client
   cd client
   npm install
   npm run dev

# Client opens at http://localhost:5173
