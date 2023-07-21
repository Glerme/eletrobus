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
import { EStatus } from "./EStatus";

interface StatusProps {
  status: EStatus;
}

export const Status = ({ status }: StatusProps) => {
  // const [favorite, setFavorite] = useState(route?.favorite);

  let color = "";
  switch (status) {
    case EStatus.DISPONIVEL:
      color = "#A7E179";
      break;
    case EStatus.INDISPONIVEL:
      color = "#E17979";
      break;
    case EStatus.MANUTENCAO:
      color = "#e1d379";
      break;
    case EStatus.DESCONECTADO:
      color = "#a9abac";
      break;
    case EStatus.PARADO:
      color = "#79c9e1";
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
        {status}
      </Text>
    </HStack>
  );
};
