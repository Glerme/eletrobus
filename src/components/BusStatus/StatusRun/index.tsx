import {
  Box,
  HStack,
  Pressable,
  Spacer,
  Text,
  VStack,
  View,
} from "native-base";
import { ArrowRight, Timer } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { IBusRoute } from "~/interfaces/IBusRoute";
import { diferenceTimeSeconds } from "~/utils/date";
import { formatSecounds } from "~/utils/format";
import { EStatusType } from "../StatusInfo/EStatusType";

interface StatusRun {
  busRoute: IBusRoute;
}

export const StatusRun = ({ busRoute }: StatusRun) => {
  if (busRoute.trafegando) {
    return (
      <Text fontSize={"sm"} color="green.600" fontWeight="medium">
        Corrida Iniciada
      </Text>
    );
  } else {
    //sairá em menos de 1h

    if (
      busRoute.statusCorrida === EStatusType.CANCELADA ||
      diferenceTimeSeconds(busRoute.saida) > 3600 * 24 * 8 //maior q 1 semana
    ) {
      return (
        <Text fontSize={"sm"} color="red.600" fontWeight="medium">
          Corrida Cancelada
        </Text>
      );
    } else if (busRoute.statusCorrida === EStatusType.INDISPONIVEL) {
      return (
        <Text fontSize={"sm"} color="red.600" fontWeight="medium">
          Indisponível
        </Text>
      );
    } else if (diferenceTimeSeconds(busRoute.saida) < 3600) {
      return (
        <Text fontSize={"sm"} color="yellow.600" fontWeight="medium">
          Em Breve
        </Text>
      );
    } else {
      return (
        <Text fontSize={"sm"} color="orange.600" fontWeight="medium">
          Á Sair
        </Text>
      );
    }
  }

  //trafegando -> !trafegando &(  saida < 1h ->  saida > 1h -> cancelada -> indisponivel)
};
