import { axiosErrorHandler } from "~/functions/axiosErrorHandler";
import api from "../axios";

interface ParamsProps {
  id: string;
  latitude: number;
  longitude: number;
}

export const postCurrentPositionId = async ({
  id,
  latitude,
  longitude,
}: ParamsProps) => {
  try {
    return api.post(`course/current-position/${id}`, {
      latitude: `${latitude}`,
      longitude: `${longitude}`,
    });
  } catch (error) {
    const axiosError = axiosErrorHandler(error);
    console.error(axiosError);
  }
};
