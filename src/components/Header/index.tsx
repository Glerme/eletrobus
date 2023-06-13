import {
  Heading,
  HStack,
  Icon,
  IconButton,
  StyledProps,
  useTheme,
} from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

interface HeaderProps extends StyledProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title, ...rest }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      {...rest}
    >
      <IconButton
        icon={
          <Icon as={FontAwesome5} name="arrow-left" size={4} color={"black"} />
        }
        onPress={handleGoBack}
      />

      <Heading
        color="gray.100"
        textAlign="center"
        fontSize="lg"
        flex={1}
        ml={-6}
      >
        {title}
      </Heading>
    </HStack>
  );
};
