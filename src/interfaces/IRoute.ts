import { EStatusType } from "../components/StatusInfo/EStatusType";

export interface IRoute {
  id: number;
  name: string;
  favorite: boolean;
  saida: Date;
  chegada: Date;
  status: EStatusType;
  tipo: "estudantes" | "todos";
}
