import { BusStopProps } from "~/interfaces/BusStop.interface";
import api from "../axios";

export const getByIdBusStopService = async (id: string) => {
  const { data } = await api.get<BusStopProps>(`/bus-stop/${id}`);

  return data;
};
