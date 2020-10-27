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
    socket.on("eventName", (arguments) => {
      // Action
    });
    ```
  - BE:
    ```ts
    io.on("eventName", (arguments) => {
      // Action
    });
    ```

### Send

- To 1 connection:

  ```ts
  socket.emit("eventName", arguments);
  ```

- To all connection:
  ```ts
  io.emit("eventName", arguments);
  ```
