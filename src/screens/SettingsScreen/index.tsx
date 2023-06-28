import { Title } from "~/components/Title";
import { Background } from "~/components/Background";
import { ScreenContent } from "~/components/ScreenContent";

export const SettingsScreen = () => {
  return (
    <Background>
      <ScreenContent>
        <Title size="md">Configurações</Title>
      </ScreenContent>
    </Background>
  );
};
