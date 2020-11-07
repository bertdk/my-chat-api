const socket = io();

// Elements
const $messageForm = document.getElementById('messageForm');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocation = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// Templates
const $messageTemplate = document.querySelector('#message-template').innerHTML;

socket.on('message', (message) => {
  const html = Mustache.render($messageTemplate, {
    message,
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  $messageFormButton.setAttribute('disabled', 'disabled');
  const message = e.target.elements.message.value;
  socket.emit('messageSend', message, (error) => {
    $messageFormButton.removeAttribute('disabled');
    $messageFormInput.value = '';
    $messageFormInput.focus();
    if (error) {
      return console.log('ack', error);
    }
    console.log('Message delivered');
  });
});

$sendLocation.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported for you browser.');
  }
  $sendLocation.setAttribute('disabled', 'disabled');
  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('sendLocation', { longitude: position.coords.longitude, latitude: position.coords.latitude }, () => {
      console.log('Location send');
      $sendLocation.removeAttribute('disabled');
    });
  });
});
