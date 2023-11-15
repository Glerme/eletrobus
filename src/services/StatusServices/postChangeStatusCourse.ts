import { IStatus } from "~/interfaces/Status.interface";
import api, { setSignOutFunction } from "../axios";

import { CourseInterface } from "~/interfaces/Course.interface";

export const postChangeStatusCourse = async (id: string, id_status: string) => {
  const { data } = await api.post(`/course/${id}/status`, {
    id_status: id_status,
  });

  return data;
};
