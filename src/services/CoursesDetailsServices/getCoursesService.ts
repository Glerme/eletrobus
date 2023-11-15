import api from "../axios";
import { CourseDataProps } from "~/interfaces/Course.interface";

export const getCoursesDetailsService = async (routeId: string) => {
  const { data } = await api.get<CourseDataProps>(`/route/${routeId}`);
  return data;
};
