import {
  Box,
  HStack,
  Pressable,
  Spacer,
  Text,
  VStack,
  View,
} from "native-base";
import { InterfaceHStackProps } from "native-base/lib/typescript/components/primitives/Stack/HStack";

import { Student } from "phosphor-react-native";

interface RouteStudentsProps extends InterfaceHStackProps {
  tipo: string | undefined;
}

export const RouteStudents = (props: RouteStudentsProps) => {
  if (props.tipo === "estudantes")
    return (
      <HStack alignItems="center" space={1} {...props}>
        <Student size={14} />
        <Text fontSize={11} fontWeight="medium" color="coolGray.500">
          Estudantes
        </Text>
      </HStack>
    );
  else return <></>;
};
