# My first app with sockets

- [My first app with sockets](#my-first-app-with-sockets)
  - [Intro](#intro)
  - [Install](#install)
  - [Event](#event)
    - [Subscribe](#subscribe)
    - [Send](#send)
  - [Ack](#ack)
    - [Implement](#implement)
    - [Use case](#use-case)

## Intro

Sockets are used to have a connection from server to client and from client to server. The server can notify the client when something happened.

## Install

- Install socket.io (FE and BE)
- BE: Create server and io object

  ```ts
  server = createServer(this.host);
  io = socket(this.server);
  ```

- FE: Create socket object
  ```ts
  const socket = io();
  ```

## Event

### Subscribe

Get noticed when event send

- FE:
  ```ts
  socket.on('eventName', (arguments) => {
    // Action
  });
  ```
- BE:

  ```ts
  io.on('connection', (socket) => {
    socket.on('eventName', (arguments) => {
      // Action
    });
  });
  ```

- Build-in events:
  - When a user makes a connection: `io.on("connection", ...)`
  - When a user gets disconnected: `socket.on("disconnect", ...)`

### Send

- To 1 connection:

  ```ts
  socket.emit('eventName', arguments);
  ```

- To all connection:

  ```ts
  io.emit('eventName', arguments);
  ```

- Broadcast = send to everyone except the one who send it:
  ```ts
  socket.broadcast.emit('message', 'A new user has joined');
  ```

## Ack

Allows the receiver of the event to process and acknowledge the event

- Client (emit) -> server (receives) --acknowledgment--> client
- Serve (emit) -> client (receives) --acknowledgment--> server

### Implement

- Event emitter
  - Last argument = function: will run when event is acknowledged (number of parameters depends on what receiver sends back arguments)
  ```ts
  socket.on('eventName', (arguments, callback) => {
    // Action
    callback(arguments);
  });
  ```
- Receiver (listener)
  - New parameter on callback function
  - Call that parameter in the function
  - Can send as many parameters back as you want
  ```ts
  socket.broadcast.emit('message', 'message to send', (arguments) => {
    // Action when acknowledged
  });
  ```

### Use case

- Validation
- Enable/disable buttons until ack
