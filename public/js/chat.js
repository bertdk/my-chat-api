const socket = io();

// socket.on("countUpdated", (count) => {
//   console.log("the count has been updated!", count);
// });

// document.querySelector("#plusOne").addEventListener("click", () => {
//   console.log("clicked");
//   socket.emit("increment");
// });

socket.on("welcome", (message) => {
  console.log("message", message);
});

socket.on("messageReceived", (message) => {
  console.log("message received", message);
});

document.querySelector("#messageForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target[0].value;
  console.log(e);
  socket.emit("messageSend", message);
});
