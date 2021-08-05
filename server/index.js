const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/key");
const cookieParser = require("cookie-parser");
// const cors = require("cors");
const path = require("path");
const http = require("http");
const SocketIO = require("socket.io");

const server = http.createServer(app);
const io = SocketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.onAny((event) => {
    console.log(`Socket Event: ${event}`);
  });
  socket.on("msg", (msg, done) => {
    console.log(socket.id);
    socket.join(msg);
    console.log(socket.rooms);
    done();
    socket.to(msg).emit("Welcome");
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };

// app.use(cors(corsOptions));

mongoose
  .connect(config.mongoURI, {
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
app.use("/upload", express.static("../upload"));
app.use("/api/conversations", require("./routes/conversation"));
app.use("/api/messages", require("./routes/message"));

if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3050;

server.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
