import { EStatusType } from "../components/StatusInfo/EStatusType";

export interface IRoute {
  id: number;
  name: string;
  favorite: boolean;
  saida: Date;
  chegada: Date;
  statusCorrida?: EStatusType;
  trafegando: boolean;
  tipo?: "estudantes" | "todos" | string;
}
