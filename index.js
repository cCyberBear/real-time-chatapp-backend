require("dotenv").config();
const express = require("express");
const cors = require("cors");
const catchError = require("./middlewares/error");
const mongoose = require("mongoose");
const Mongo = require("./config/db");
const userRouter = require("./routes/userRoute");
const messageRouter = require("./routes/messageRoute");
const conservationRouter = require("./routes/conversationRoute");

Mongo.conect();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/kd/api/v0/user", userRouter);
app.use("/kd/api/v0/message", messageRouter);
app.use("/kd/api/v0/conservation", conservationRouter);

app.use(catchError);
const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});

const io = require("socket.io")(server, {
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const Message = mongoose.model("Message");

io.use(async (socket, next) => {
  try {
    const userId = socket.handshake.query.userId;
    socket.userId = userId;
    next();
  } catch (err) {
    console.log(err);
  }
});

io.on("connection", (socket) => {
  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

  socket.on("joinRoom", ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log("A user joined chatroom: " + chatroomId);
  });

  socket.on("leaveRoom", ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log("A user left chatroom: " + chatroomId);
  });

  socket.on("chatroomMessage", async ({ conversationId, text }) => {
    if (text.trim().length > 0) {
      const newMessage = new Message({
        conversationId,
        sender: socket.userId,
        text,
      });
      const savedMessage = await newMessage.save();
      io.emit("newMessage", {
        ...savedMessage,
      });
    }
  });
});
