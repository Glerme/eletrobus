import { Platform } from "react-native";

import { Box, View } from "native-base";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { NavigationProps } from "~/routes";

import { Input } from "~/components/Form/Input";
import { Button } from "~/components/Form/Button";
import { Title } from "~/components/Layouts/Title";
import { ImagePicker } from "~/components/Form/ImagePicker";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

export const ProfileScreen = ({
  navigation,
  route,
}: NavigationProps<"Profile">) => {
  return (
    <Background>
      <ScreenContent>
        <Title>Profile Screen</Title>

        <Box mt={5} mb={5}>
          <ImagePicker />
        </Box>

        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          enableOnAndroid
          enableAutomaticScroll={Platform.OS === "ios"}
        >
          <View>
            <Input placeholder="Nome" mb={2} />
            <Input placeholder="Email" keyboardType="email-address" mb={2} />

            <Input placeholder="Senha" secureTextEntry={true} mb={2} />

            <Input placeholder="Nova Senha" secureTextEntry={true} />
          </View>
        </KeyboardAwareScrollView>

        <Button
          title="Salvar"
          onPress={() => console.log("salvar")}
          fontColor="white"
          h={12}
          mb={2}
          mx={2}
        />
      </ScreenContent>
    </Background>
  );
};
