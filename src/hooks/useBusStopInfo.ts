import { useState } from "react";
import { BusStopProps } from "~/interfaces/BusStop.interface";

export const useBusStopInfo = () => {
  const [dataPoint, setDataPoint] = useState<BusStopProps | null>(null);

  return { dataPoint, setDataPoint };
};
