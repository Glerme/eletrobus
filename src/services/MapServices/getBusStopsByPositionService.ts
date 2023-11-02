import api from "../axios";

import { BusStopInterface } from "~/interfaces/BusStop.interface";

interface PositionProps {
  latitude: number;
  longitude: number;
  range?: number;
}

export const getBusStopsByPositionService = async (position: PositionProps) => {
  const { data } = await api.get<BusStopInterface>(
    "/bus-stop/by-position?latitude=-22.371273&longitude=-48.7737459&range=5000"
  );
  return data;
};
