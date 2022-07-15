const dotenv = require("dotenv");
const socket = require("socket.io");

dotenv.config({ path: "./.env" });

const app = require("./app");

const port = process.env.PORT || 3000;

const io = socket(
  app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  })
);

io.on("connection", (socket) => {
  // Host Connection
  socket.on("host-join", (data) => {
    socket.join(data.pin);
  });
  //Player Join Room
  socket.on("player-joined", (data) => {
    socket.join(data);
  });
  //Add player to Quiz Object
  socket.on("player-add", (data) => {
    socket
      .to(`${data.selectedPin}`)
      .emit("room-joined", { name: data.nickname, id: socket.id });
  });

  socket.on("question-over", (data) => {
    socket.to(`${data.pin}`).emit("question-over");
  });
  socket.on("next-question", (data) => {
    socket.to(`${data.pin}`).emit("next-question");
  });
  socket.on("question-answered", (data) => {
    socket
      .to(data.pin)
      .emit("player-answer", { name: data.name, answer: data.answer });
  });

  socket.on("sent-info", (data) => {
    io.to(data.id).emit("sent-info", {
      answeredCorrect: data.answeredCorrect,
      score: data.score,
    });
  });
});
