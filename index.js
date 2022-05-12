require("dotenv").config();
const express = require("express");
const cors = require("cors");
const catchError = require("./middlewares/error");

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
app.listen(process.env.PORT || 5000, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});
