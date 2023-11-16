import { useState } from "react";
import { BusStopProps } from "~/interfaces/BusStop.interface";
import { ICourse } from "~/interfaces/RoutesBusStops.interface";
import { IStatus } from "~/interfaces/Status.interface";

export const useAllStatus = () => {
  const [allStatus, setAllStatus] = useState<IStatus[] | null>(null);

  return { allStatus, setAllStatus };
};
