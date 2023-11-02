import api, { setSignOutFunction } from "../axios";

import { FavoriteBusStopInterface } from "~/interfaces/FavoriteBusStop.interface";

interface ParamsProps {
  pageParam: number;
  getRefreshToken: () => void;
}

export const getDriverFavoritesCoursesService = async ({
  pageParam,
  getRefreshToken,
}: ParamsProps) => {
  const pageSize = 10;

  setSignOutFunction(getRefreshToken);

  return api.get<FavoriteBusStopInterface>(
    `/user/favorite/courses?page=${pageParam}&pageSize=${pageSize}&orderAsc=desc`
  );
};
