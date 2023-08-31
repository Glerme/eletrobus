import { HStack, Image, Text } from "native-base";
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";

import { MarkerType } from "~/interfaces/Route.interface";

interface TypeRouteProps extends InterfaceHStackProps {
  tipo?: MarkerType;
}

export const TypeRoute = ({ tipo = "bus", ...rest }: TypeRouteProps) => {
  const marker = {
    image:
      tipo === "bus"
        ? require("~/assets/img/bus.png")
        : require("~/assets/img/bus-stop.png"),
    description: tipo === "bus" ? "Ônibus" : "Ponto de ônibus",
  };

  return (
    <HStack alignItems="center" space={1} {...rest}>
      <Image
        source={marker.image}
        style={{
          height: 30,
          width: 30,
          resizeMode: "center",
        }}
        alt={marker.description}
      />
      <Text fontSize={14} fontWeight="medium" color="coolGray.500">
        {marker.description}
      </Text>
    </HStack>
  );
};
