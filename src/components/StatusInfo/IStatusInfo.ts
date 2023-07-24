import { EStatusInfo } from "./EStatusInfo";

export interface IStatusInfo {
  id: number;
  name: string;
  favorite: boolean;
  saida: Date;
  chegada: Date;
  status: EStatusInfo;
  tipo: string;
}
