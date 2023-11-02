import api from "../axios";

export const updateAvatarService = async (formData: any) => {
  const { data } = await api.put("/user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });

  return data;
};
