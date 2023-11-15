import { FavoriteCourseInterface } from "~/interfaces/FavoriteCourse.interface";
import api from "../axios";

export const getCoursesFavoritesService = async () => {
  const { data } = await api.get<FavoriteCourseInterface>(
    `/user/favorite/route`
  );
  return data?.data;
};
