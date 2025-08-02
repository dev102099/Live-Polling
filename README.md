Live Polling SystemA real-time, interactive polling application designed for classroom environments, allowing teachers to create polls and students to participate live. This project was built as part of the SDE Intern assignment for Intervue.io.FeaturesThe application supports two distinct user roles with a specific set of features for each.👩‍🏫 Teacher FeaturesCreate Polls: Easily create new questions with multiple-choice options.Set Time Limits: Configure a specific time limit for each poll.Live Results: View incoming poll results in real-time as students submit their answers.Control Flow: Can only ask a new question after the previous one has concluded, ensuring a structured session.🎓 Student FeaturesJoin Session: Enter a name and join the live session.Answer Polls: Select and submit an answer for the active poll within the given time limit.View Results: See the final class-wide results after the poll has ended.🛠️ Technology StackThis project is a full-stack application built with a modern JavaScript toolchain.Frontend:React: A declarative UI library for building the user interface.Redux Toolkit: For predictable and centralized state management.React Router: For client-side routing and navigation.Socket.io Client: To manage the real-time WebSocket connection with the server.Tailwind CSS: A utility-first CSS framework for rapid and clean UI design.Backend:Node.js: JavaScript runtime for the server.Express.js: A minimal and flexible web application framework.Socket.io: Enables real-time, bidirectional, and event-based communication.🚀 Getting StartedTo get a local copy up and running, follow these simple steps.PrerequisitesNode.js (v14 or later)npm (or yarn)Setup & InstallationThe project is structured into two main folders: client (the React frontend) and server (the Express backend). You will need to run them in two separate terminal windows.1. Clone the repository:git clone [https://github.com/your-username/live-polling-system.git](https://github.com/your-username/live-polling-system.git)
cd live-polling-system 2. Set up the Backend Server:# Navigate to the server directory
cd server

# Install dependencies

npm install

# Start the development server (runs on http://localhost:3002)

npm run dev
The server will now be running and listening for connections.3. Set up the Frontend Client:Open a new terminal window.# Navigate to the client directory from the root folder
cd client

# Install dependencies

npm install

# Start the React development server (opens in your browser at http://localhost:5173)

npm run dev
Your browser should automatically open with the application running. You can now interact with the live polling system.
