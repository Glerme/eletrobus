import {
  Box,
  HStack,
  Pressable,
  Spacer,
  Text,
  VStack,
  View,
} from "native-base";

import { Star, Student, UsersThree } from "phosphor-react-native";
import { useState } from "react";
import { THEME } from "~/styles/theme";

import { formatDate } from "~/utils/format";
import { EStatusType } from "./EStatusType";

interface StatusProps {
  statusCorrida: EStatusType | undefined;
}

export const StatusInfo = ({ statusCorrida }: StatusProps) => {
  // const [favorite, setFavorite] = useState(route?.favorite);

  let color = "";
  switch (statusCorrida) {
    // case EStatusType.DISPONIVEL:
    //   color = "#A7E179";
    //   break;
    case EStatusType.EM_MOVIMENTO:
      color = "#7990e1";
      break;
    case EStatusType.MANUTENCAO:
      color = "#e1d379";
      break;
    case EStatusType.DESCONECTADO:
      color = "#a9abac";
      break;
    case EStatusType.PARADO:
      color = "#79e1cc";
      break;
  }

  return (
    <HStack space={1} alignItems="center">
      <View
        width={11}
        height={11}
        borderRadius={50}
        backgroundColor={color}
        // backgroundColor={route?.status ? "#A7E179" : "#E17979"}
      />
      <Text fontSize={11} fontWeight="medium" color="coolGray.500">
        {statusCorrida}
      </Text>
    </HStack>
  );
};
