import { EStatusRun } from "~/enum/EStatusRun";

export function getColorFromState(state: EStatusRun) {
  switch (state) {
    case EStatusRun.EmCorrida:
      return "#06CB56";
    case EStatusRun.Parado:
      return "#AFAFAF";
    case EStatusRun.Incapacitado:
      return "#FE454B";
    default:
      return "#000000";
  }
}
