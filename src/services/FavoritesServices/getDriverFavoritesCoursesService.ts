import { FavoriteCourseInterface } from "~/interfaces/FavoriteCourse.interface";
import api, { setSignOutFunction } from "../axios";

interface ParamsProps {
  pageParam: number;
  getRefreshToken: () => void;
}

export const getDriverFavoritesCoursesService = async ({
  pageParam,
  getRefreshToken,
}: ParamsProps) => {
  const pageSize = 30;

  setSignOutFunction(getRefreshToken);

  return api.get<FavoriteCourseInterface>(`/user/favorite/route`, {
    params: {
      page: pageParam,
      pageSize: pageSize,
      orderAsc: "desc",
    },
  });
};
