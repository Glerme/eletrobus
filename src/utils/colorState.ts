import { EStateRun } from "~/enum/EStateRun";

export function getColorFromState(state: EStateRun) {
  switch (state) {
    case EStateRun.EmCorrida:
      return "#06CB56";
    case EStateRun.Parado:
      return "#AFAFAF";
    default:
      return "#000000";
  }
}
