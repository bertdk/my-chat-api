export const generateMessage = (username: string, text: string) => ({
  username,
  text,
  createdAt: new Date().toLocaleTimeString(),
});

export const generateLocationMessage = (username: string, latitude: number, longitude: number) => ({
  username,
  url: `https://google.com/maps?q=${latitude},${longitude}`,
  createdAt: new Date().toLocaleTimeString(),
});
