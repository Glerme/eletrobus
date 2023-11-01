import api from "./axios";

interface UserProps {
  name: string;
  email: string;
  password: string;
}

export const createUserService = async (user: UserProps) => {
  const { data, status } = await api.post("/user", {
    name: user.name,
    email: user.email,
    password: user.password,
  });

  return { data, status };
};
