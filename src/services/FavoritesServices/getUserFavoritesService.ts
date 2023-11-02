import api, { setSignOutFunction } from "../axios";

import { FavoriteBusStopInterface } from "~/interfaces/FavoriteBusStop.interface";

interface ParamsProps {
  pageParam: number;
  getRefreshToken: () => void;
}

export const getUserFavoritesService = async ({
  pageParam,
  getRefreshToken,
}: ParamsProps) => {
  const pageSize = 10;

  setSignOutFunction(getRefreshToken);

  return api.get<FavoriteBusStopInterface>(
    `/user/favorite/bus-stop?page=${pageParam}&pageSize=${pageSize}&orderAsc=desc`
  );
};
