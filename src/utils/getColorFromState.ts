import { EStatusRun } from "~/enum/EStatusRun";

type ICurrentPosition = EStatusRun | null;

export function getColorFromState(state: ICurrentPosition) {
  if (!state) return "#000000";

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
