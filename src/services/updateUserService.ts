import api from "./axios";

interface ProfileFields {
  name: string;
  email: string;
  password?: string;
}

export const updateUserService = async (fields: ProfileFields) => {
  const { data } = await api.put(`/user`, {
    name: fields?.name ?? undefined,
    email: fields?.email ?? undefined,
    password: fields?.password ? fields?.password : undefined,
  });

  return data;
};
