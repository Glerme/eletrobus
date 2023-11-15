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
// export const EStatusRun: IStatusRun = {
//   EmCorrida: { status: "EM CORRIDA", id: "65527025f21e3c58f53acc92" },

//   Parado: { status: "PARADO", id: "65527101f21e3c58f53acc93" },

//   Incapacitado: { status: "INCAPACITADO", id: "65527111f21e3c58f53acc94" },

//   Finalizado: { status: "FINALIZADO", id: "6553ad9d174ce2ff6999efc1" },
// };
