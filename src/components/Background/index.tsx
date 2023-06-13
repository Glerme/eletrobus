import { HStack, Icon, IconButton } from "native-base";
import { Container, Content, BackgroundHeader } from "./styles";

import { MaterialIcons } from "@expo/vector-icons";

interface BackgroundProps {
  children: React.ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
  return (
    <>
      <HStack
        bg="#0DAC86"
        px="2"
        py="2"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        <HStack alignItems="center">
          <IconButton
            icon={
              <Icon size="lg" as={MaterialIcons} name="menu" color="white" />
            }
          />
        </HStack>
        <HStack>
          <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name="more-vert"
                size="lg"
                color="white"
              />
            }
          />
        </HStack>
      </HStack>

      <Container>
        <BackgroundHeader colors={["#0DAC86", "#0DAC87"]} />
        <Content>{children}</Content>
      </Container>
    </>
  );
};
