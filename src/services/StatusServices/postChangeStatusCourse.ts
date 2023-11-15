import api from "../axios";

export const postChangeStatusCourse = async (id: string, id_status: string) => {
  console.log("id", id, "id_status", id_status);
  const { data } = await api.post(`/course/${id}/status`, {
    id_status: id_status,
  });

  return data;
};
