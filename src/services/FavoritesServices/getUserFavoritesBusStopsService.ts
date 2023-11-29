import api, { setSignOutFunction } from "../axios";

import { FavoriteBusStopInterface } from "~/interfaces/FavoriteBusStop.interface";

interface ParamsProps {
  pageParam: number;
  getRefreshToken: () => void;
}

export const getUserFavoritesBusStopsService = async ({
  pageParam,
  getRefreshToken,
}: ParamsProps) => {
  const pageSize = 30;

  setSignOutFunction(getRefreshToken);

  return api.get<FavoriteBusStopInterface>(`/user/favorite/bus-stop`, {
    params: {
      page: pageParam,
      pageSize: pageSize,
      orderAsc: "desc",
    },
  });
};
