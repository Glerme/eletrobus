import { HStack, Text } from "native-base";
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";

import { Student, Bus } from "phosphor-react-native";

interface TypeRouteProps extends InterfaceHStackProps {
  tipo: "estudantes" | "circulares";
}

export const TypeRoute = ({ tipo, ...rest }: TypeRouteProps) => {
  if (tipo === "circulares") {
    return (
      <HStack alignItems="center" space={1} {...rest}>
        <Bus size={20} />
        <Text fontSize={14} fontWeight="medium" color="coolGray.500">
          Circulares
        </Text>
      </HStack>
    );
  }

  return (
    <HStack alignItems="center" space={1} {...rest}>
      <Student size={20} />
      <Text fontSize={14} fontWeight="medium" color="coolGray.500">
        Estudantes
      </Text>
    </HStack>
  );
};
