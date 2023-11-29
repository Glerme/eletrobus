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
  const pageSize = 30;

  return api.get<BusStopInterface>(`/bus-stop`, {
    params: {
      page: pageParam,
      pageSize: pageSize,
      search: queryString,
    },
  });
};
