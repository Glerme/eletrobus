import { IStatus } from "~/interfaces/Status.interface";
import api from "../axios";

export const getAllStatusService = async () => {
  const { data } = await api.get<{ data: IStatus[] }>(`/status`);

  return data.data;
};
