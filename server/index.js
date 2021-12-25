const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const http = require("http");
const SocketIO = require("socket.io");
const cors = require("cors");

// Socket
const server = http.createServer(app);
const io = SocketIO(server);

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  // when connect
  console.log("socket is connected");

  // take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUser", users);
  });

  // send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("notification", ({ senderNickname, receiverId }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("notification", {
      senderNickname,
    });
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("not working"));

app.use("/api/users", require("./routes/user"));
app.use("/api/auth", require("./routes/authMail"));
app.use("/api/product", require("./routes/product"));
app.use("/api/conversations", require("./routes/conversation"));
app.use("/api/messages", require("./routes/message"));

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
