import { EStatusRun } from "~/enum/EStatusRun";
import { IStatus } from "~/interfaces/Status.interface";

export function getColorFromState(state: EStatusRun) {
  switch (state) {
    case EStatusRun.EmCorrida:
      return "#06CB56";
    case EStatusRun.Parado:
      return "#AFAFAF";
    case EStatusRun.Incapacitado:
      return "#FE454B";
    case EStatusRun.Finalizado:
      return "#4d34dd";
    default:
      return "#000000";
  }
}
