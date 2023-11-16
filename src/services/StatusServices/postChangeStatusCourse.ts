import api from "../axios";

export const postChangeStatusCourse = async (id: string, id_status: string) => {
  const { data } = await api.post(`/course/${id}/status`, {
    id_status: id_status,
  });

  return data;
};
