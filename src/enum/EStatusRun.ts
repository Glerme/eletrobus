import { IStatus } from "~/interfaces/Status.interface";

export interface IStatusRun {
  EmCorrida: IStatus;
  Parado: IStatus;
  Incapacitado: IStatus;
  Finalizado: IStatus;
}

export enum EStatusRun {
  EmCorrida = "EM CORRIDA",
  Parado = "PARADO",
  Incapacitado = "INCAPACITADO",
  Finalizado = "FINALIZADO",
}
