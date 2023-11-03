import api from "../axios";

import { BusStopProps } from "~/interfaces/BusStop.interface";

interface PositionProps {
  latitude: number;
  longitude: number;
  range?: number;
}

export const getBusStopsByPositionService = async (position: PositionProps) => {
  console.log("MUDOU O COORDS", position);

  const { data } = await api.get<BusStopProps[]>(
    `/bus-stop/by-position?latitude=${position.latitude}&longitude=${
      position.longitude
    }&range=${position?.range ?? 60000}`
  );

  return data;
};
