import { format } from "date-fns";

export const formatDate = (date: Date) => {
  try {
    return date ? format(date, "dd/MM/yyyy") : "";
  } catch (error) {
    return "-";
  }
};

export const formatDatetime = (date: Date) => {
  return format(date, "dd/MM/yyyy HH:mm:ss");
};
export const formatHours = (date?: Date) => {
  if (!date) return "";
  return format(date, "dd/MM - HH:mm").replace(":", "h");
};

export const formatSecounds = (sec: number) => {
  const hrs = Math.floor(sec / 3600);
  const min = Math.floor((sec % 3600) / 60);
  const secondsRest = sec % 60;

  const formatado = `${hrs.toString().padStart(2, "0")}h${min
    .toString()
    .padStart(2, "0")}m${secondsRest.toString().padStart(2, "0")}s`;

  return formatado;
};

export const diferenceTimeSeconds = (date: Date) => {
  if (!date) return "";
  return Math.floor((new Date().getTime() - date.getTime()) / 1000);
};
