export const generateMessage = (text: string) => ({
  text,
  createdAt: new Date().toLocaleTimeString(),
});

export const generateLocationMessage = (latitude: number, longitude: number) => ({
  url: `https://google.com/maps?q=${latitude},${longitude}`,
  createdAt: new Date().toLocaleTimeString(),
});
