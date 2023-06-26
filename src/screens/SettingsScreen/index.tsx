import { Heading, Text } from "native-base";
import { Background } from "~/components/Background";
import { ScreenContent } from "~/components/ScreenContent";

export const SettingsScreen = () => {
  return (
    <Background>
      <ScreenContent>
        <Heading size="sm">Configurações</Heading>
      </ScreenContent>
    </Background>
  );
};
