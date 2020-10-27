# My first app with sockets

- [My first app with sockets](#my-first-app-with-sockets)
  - [Intro](#intro)
  - [Install](#install)
  - [Event](#event)
    - [Subscribe](#subscribe)
    - [Send](#send)

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

- Get noticed when event send:

  - FE:
    ```ts
    socket.on('eventName', (arguments) => {
      // Action
    });
    ```
  - BE:

    ```ts
    io.on('eventName', (arguments) => {
      // Action
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
