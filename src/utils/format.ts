import { format } from "date-fns";

export const formatDate = (date: Date) => {
  if (!date) return "-";
  return format(date, "dd/MM/yyyy");
};

export const formatDatetime = (date?: Date) => {
  if (!date) return "-";
  return format(date, "dd/MM/yyyy HH:mm:ss");
};
export const formatHoursDataMin = (date?: Date) => {
  if (!date) return "-";
  return format(date, "dd/MM - HH:mm").replace(":", "h");
};
export const formatHoursMinutes = (date?: Date) => {
  if (!date) return "-";
  return format(date, "HH:mm").replace(":", "h");
};
export const formatHoursMinutesSeconds = (date?: Date) => {
  if (!date) return "-";
  return format(date, "hh:mm:ss").replace(":", "h");
};

export const formatSecounds = (sec: number) => {
  const hrs = Math.floor(sec / 3600);
  const min = Math.floor((sec % 3600) / 60);
  const secondsRest = sec % 60;

  const formated = `${hrs.toString().padStart(2, "0")}h${min
    .toString()
    .padStart(2, "0")}`;
  // ${secondsRest.toString().padStart(2, "0")}s;

  return formated;
};

export const diferenceTimeSeconds = (date: Date) => {
  if (!date) return "-";
  return Math.floor((new Date().getTime() - date.getTime()) / 1000);
};
