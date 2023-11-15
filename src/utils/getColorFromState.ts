import { EStatusRun } from "~/enum/EStatusRun";
import { IStatus } from "~/interfaces/Status.interface";

export function getColorFromState(state: IStatus) {
  switch (state.status) {
    case EStatusRun.EmCorrida.status:
      return "#06CB56";
    case EStatusRun.Parado.status:
      return "#AFAFAF";
    case EStatusRun.Incapacitado.status:
      return "#FE454B";
    default:
      return "#000000";
  }
}
