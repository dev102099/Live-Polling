const express = require("express");
const userRouter = require("./routes/userRoutes");
const { createServer } = require("node:http");
const app = express();
const port = 3002;
const { Server } = require("socket.io");
const cors = require("cors");
const ioHandler = require("./controller/ioHandler");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "https://live-polling-uxn5.onrender.com", credentials: true },
});

ioHandler(io);

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/users", userRouter);

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
