import api from "../axios";

interface IDriverFields {
  cpf: string;
  cnh: string;
}

export const updateDriverService = async (fields: IDriverFields) => {
  const data = await api.put(`/driver`, {
    cpf: fields?.cpf ?? undefined,
    cnh: fields?.cnh ?? undefined,
  });

  return data;
};
