import api from "../axios";

import { CourseInterface } from "~/interfaces/Course.interface";

interface ParamsProps {
  pageParam: number;
  queryString: string;
}

export const getCoursesService = async ({
  pageParam,
  queryString,
}: ParamsProps) => {
  const pageSize = 10;

  return api.get<CourseInterface>(
    `/course/my?page=${pageParam}&pageSize=${pageSize}&search=${queryString}`
  );
};
