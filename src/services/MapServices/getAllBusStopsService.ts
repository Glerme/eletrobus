import api from "../axios";

import { BusStopInterface } from "~/interfaces/BusStop.interface";

export const getAllBusStopsService = async () => {
  const { data } = await api.get<BusStopInterface>(`/bus-stop/all`);

  return data?.data;
};
