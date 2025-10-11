import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "node:http";

dotenv.config();

const port = process.env.PORT || 8000;
const reactUrl = process.env.REACT_URL || "http://localhost:5173";

const app = express();

app.use(
  cors({
    origin: reactUrl,
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Server working ✅" });
});

const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
  cors: {
    origin: reactUrl,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {});

  socket.on("join_room", (dataUser) => {
    socket.join(dataUser.room);
  });

  socket.on("send_message", (dataMessage) => {
    socket.to(dataMessage.room).emit("receive_message", dataMessage);
  });
});

server.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
  console.log(`🔗 CORS allowed from ${reactUrl}`);
});
