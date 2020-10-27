const socket = io();

socket.on('message', (message) => {
  console.log('message received', message);
});

document.querySelector('#messageForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  socket.emit('messageSend', message);
});

document.querySelector('#send-location').addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported for you browser.');
  }
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('sendLocation', { longitude: position.coords.longitude, latitude: position.coords.latitude });
  });
});
