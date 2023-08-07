export const diferenceTimeSeconds = (date: Date) => {
  return Math.floor((new Date().getTime() - date.getTime()) / 1000);
};
