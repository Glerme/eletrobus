import api from "../axios";

interface IUserAsDriverFields {
  userId: string;
  cpf: string;
  cnh: string;
}

export const postUserAsDriverService = async (fields: IUserAsDriverFields) => {
  const { data } = await api.post(`/user/${fields.userId}/become-driver`, {
    cpf: fields.cpf,
    cnh: fields.cnh,
  });

  return data;
};
