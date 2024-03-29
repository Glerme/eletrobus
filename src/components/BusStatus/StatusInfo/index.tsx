import { HStack, Text, View } from "native-base";

import { EStatusType } from "./EStatusType";

interface StatusProps {
  statusCorrida: EStatusType | undefined;
}

export const StatusInfo = ({ statusCorrida }: StatusProps) => {
  // const [favorite, setFavorite] = useState(route?.favorite);

  let color = "";
  switch (statusCorrida) {
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
    case EStatusType.CANCELADA:
      color = "#ff0000";
      break;
    default:
      color = "#000000";
      break;
  }

  return (
    <HStack space={1} alignItems="center">
      <View
        width={11}
        height={11}
        borderRadius={50}
        display={statusCorrida ? "flex" : "none"}
        backgroundColor={color}
      />
      <Text fontSize={12} fontWeight="medium" color="coolGray.500">
        {statusCorrida ? statusCorrida : "------------"}
      </Text>
    </HStack>
  );
};
