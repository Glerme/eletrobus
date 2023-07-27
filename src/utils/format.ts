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
export const formatHours = (date: Date) => {
  return format(date, "dd/MM - HH:mm").replace(":", "h");
};
