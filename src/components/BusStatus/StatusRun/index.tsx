import { Text } from "native-base";

import { RouteInterface } from "~/interfaces/Route.interface";
import { EStatusType } from "../StatusInfo/EStatusType";

import { diferenceTimeSeconds } from "~/utils/format";

interface StatusRun {
  busRoute: RouteInterface;
}

export const StatusRun = ({ busRoute }: StatusRun) => {
  // if (
  //   busRoute.status === EStatusType.CANCELADA ||
  //   (busRoute?.saida && diferenceTimeSeconds(busRoute?.saida) > 3600 * 24 * 8)
  // ) {
  //   return (
  //     <Text fontSize={"sm"} color="red.600" fontWeight="medium">
  //       Corrida Cancelada
  //     </Text>
  //   );
  // } else if (busRoute.status === EStatusType.INDISPONIVEL) {
  //   return (
  //     <Text fontSize={"sm"} color="red.600" fontWeight="medium">
  //       Indisponível
  //     </Text>
  //   );
  // } else if (diferenceTimeSeconds(busRoute?.saida) < 3600) {
  //   return (
  //     <Text fontSize={"sm"} color="yellow.600" fontWeight="medium">
  //       Em Breve
  //     </Text>
  //   );
  // } else {
  //   return (
  //     <Text fontSize={"sm"} color="orange.600" fontWeight="medium">
  //       Á Sair
  //     </Text>
  //   );
  // }

  return (
    <Text fontSize={"sm"} color="orange.600" fontWeight="medium">
      Á Sair
    </Text>
  );
};

//trafegando -> !trafegando &(  saida < 1h ->  saida > 1h -> cancelada -> indisponivel)
