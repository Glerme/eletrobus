import api, { setSignOutFunction } from "../axios";

import { CourseInterface } from "~/interfaces/Course.interface";

interface ParamsProps {
  pageParam: number;
  queryString: string;
  getRefreshToken: () => void;
}

export const getCoursesService = async ({
  pageParam,
  queryString,
  getRefreshToken,
}: ParamsProps) => {
  const pageSize = 10;

  setSignOutFunction(getRefreshToken);

  return api.get<CourseInterface>(
    `/course/my?page=${pageParam}&pageSize=${pageSize}&search=${queryString}`
  );
};
