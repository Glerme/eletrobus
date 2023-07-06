import { Title } from "~/components/Title";
import { Background } from "~/components/Background";
import { ScreenContent } from "~/components/ScreenContent";
import { ScrollView } from "native-base";

export const SettingsScreen = () => {
  return (
    <Background>
      <ScrollView>
        <ScreenContent>
          <Title size="md">Configurações</Title>
        </ScreenContent>
      </ScrollView>
    </Background>
  );
};
