import { IStatus } from "~/interfaces/Status.interface";
import api, { setSignOutFunction } from "../axios";

import { CourseInterface } from "~/interfaces/Course.interface";

export const getAllStatusService = async () => {
  const { data } = await api.get<{ data: IStatus[] }>(`/status`);

  return data.data;
};
