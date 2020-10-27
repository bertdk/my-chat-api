const socket = io();

socket.on("welcome", (message) => {
  console.log("message", message);
});

socket.on("messageReceived", (message) => {
  console.log("message received", message);
});

document.querySelector("#messageForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  socket.emit("messageSend", message);
});
