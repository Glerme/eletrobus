import { EStatus } from "./EStatus";

export interface IStatus {
  id: number;
  name: string;
  favorite: boolean;
  saida: Date;
  chegada: Date;
  status: EStatus;
  tipo: string;
}
