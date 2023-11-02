import api from "../axios";

import { BusStopInterface } from "~/interfaces/BusStop.interface";

interface ParamsProps {
  pageParam: number;
  queryString: string;
}

export const getBusStopsService = async ({
  pageParam,
  queryString,
}: ParamsProps) => {
  const pageSize = 10;

  return api.get<BusStopInterface>(
    `/bus-stop?page=${pageParam}&pageSize=${pageSize}&search=${queryString}`
  );
};
