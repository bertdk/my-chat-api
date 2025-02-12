import { IUser } from '../interfaces/user.interface';

export const users: IUser[] = [];

export const addUser = (id: string, username: string, room: string): any => {
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
  return user;
};

export const removeUser = (id: string): IUser => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUser = (id: string): IUser => users.find((user) => user.id === id);

export const getUsersInRoom = (room: string): IUser[] => users.filter((user) => user.room === room);
