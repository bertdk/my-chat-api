export const users = [];

export const addUser = (id: number, username: string, room: string) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!username || !room) {
    return {
      error: 'Username and room are required',
    };
  }

  const existingUser = users.some((user) => user.room === room && user.username === username);

  if (existingUser) {
    return {
      error: 'Username is in use!',
    };
  }

  const user = { id, username, room };
  users.push(user);
  return { user };
};

export const removeUser = (id: number) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUser = (id: number) => users.find((user) => user.id === id);

export const getUsersInRoom = (room: string) => users.filter((user) => user.room === room);
