import axios, { AxiosError } from "axios";

export const axiosErrorHandler = (error: AxiosError | Error | unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data;
    }

    return error;
  } else {
    console.error(error);
    return error;
  }
};
