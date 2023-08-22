import { HStack, Image, Text } from "native-base";
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";

interface TypeRouteProps extends InterfaceHStackProps {
  tipo: "estudantes" | "circulares" | "point";
}

export const TypeRoute = ({ tipo, ...rest }: TypeRouteProps) => {
  const imgMarkerType = {
    point: require("~/assets/img/bus-stop.png"),
    bus: require("~/assets/img/bus.png"),
  };

  if (tipo === "point") {
    return (
      <HStack alignItems="center" space={1} {...rest}>
        <Image
          source={imgMarkerType["point"]}
          alt={"Ponto de Ônibus"}
          style={{
            height: 30,
            width: 30,
            resizeMode: "center",
          }}
        />
        <Text fontSize={14} fontWeight="medium" color="coolGray.500">
          Ponto
        </Text>
      </HStack>
    );
  }

  if (tipo === "circulares") {
    return (
      <HStack alignItems="center" space={1} {...rest}>
        <Image
          source={imgMarkerType.bus}
          alt={"Ônibus"}
          style={{
            height: 30,
            width: 30,
            resizeMode: "center",
          }}
        />
        <Text fontSize={14} fontWeight="medium" color="coolGray.500">
          Circulares
        </Text>
      </HStack>
    );
  }

  return (
    <HStack alignItems="center" space={1} {...rest}>
      <Image
        source={imgMarkerType.bus}
        alt={"Ônibus"}
        style={{
          height: 30,
          width: 30,
          resizeMode: "center",
        }}
      />
      <Text fontSize={14} fontWeight="medium" color="coolGray.500">
        Estudantes
      </Text>
    </HStack>
  );
};
