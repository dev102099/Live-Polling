import { io } from "socket.io-client";

const URL = "https://live-polling-backend-gwwg.onrender.com";

export const socket = io(URL);
