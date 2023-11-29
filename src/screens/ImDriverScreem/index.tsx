import { useEffect, useState } from "react";
import { Platform } from "react-native";

import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { Box, Icon, View } from "native-base";
import { Fingerprint, IdentificationCard, User } from "phosphor-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LottieView from "lottie-react-native";

import { useAuth } from "~/contexts/AuthContext";

import api, { setSignOutFunction } from "~/services/axios";
import { updateUserService } from "~/services/ProfileServices/updateUserService";

import { MyQueryInterface } from "~/interfaces/User.interface";

import { NavigationProps } from "~/routes";

import { Input } from "~/components/Form/Input";
import { Button } from "~/components/Form/Button";
import { Title } from "~/components/Layouts/Title";
import { ImagePicker } from "~/components/Form/ImagePicker";

import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";
import { TextInputMask } from "react-native-masked-text";
import { postUserAsDriverService } from "~/services/ProfileServices/postUserAsDriverService";

interface IDriverFields {
  cpf: string;
  cnh: string;
}

// const Textfield = MKTextField.textfield()
//   .withPlaceholder("Text...")
//   .withStyle(styles.textfield)
//   .build();

export const InputCPF = ({ ...rest }) => (
  <Input
    mb={2}
    placeholder="CPF"
    InputLeftElement={<Icon as={<Fingerprint />} ml={2} />}
    {...rest}
  />
);
export const InputCNH = ({ ...rest }) => (
  <Input
    mb={2}
    placeholder="CNH"
    InputLeftElement={<Icon as={<IdentificationCard />} ml={2} />}
    {...rest}
  />
);

export const ImDriverScreen = ({
  navigation,
  route,
}: NavigationProps<"ImDriver">) => {
  const { user, updateUser, getRefreshToken } = useAuth();

  const [fields, setFields] = useState<IDriverFields>({
    cpf: "",
    cnh: "",
  });

  const { mutate, isLoading } = useMutation(postUserAsDriverService, {
    onMutate: async () => {
      setSignOutFunction(getRefreshToken);
    },
    onSuccess: async (updatedUser) => {
      if (updatedUser) {
        const { data } = await api.get<MyQueryInterface>("/user/my");
        await updateUser(data);

        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Novo motorista criado com sucesso",
        });
        navigation.navigate("Home");
      }
    },
    onError: (error: any) => {
      if (error?.response?.status === 401) {
        setSignOutFunction(getRefreshToken);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: `Ocorreu um erro: ${error?.response?.data?.message}`,
        });
      }
    },
  });

  const handleSubmit = async () => {
    if (!user?.user.id) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: `Ocorreu um erro: Usuário não encontrado`,
      });
      return;
    }
    if (!fields.cpf || !fields.cnh) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: `Ocorreu um erro: Preencha todos os campos`,
      });
      return;
    }
    mutate({ ...fields, userId: user?.user.id });
  };

  return (
    <>
      <Background>
        <ScreenContent>
          {user && (
            <>
              <Box
                display={"flex"}
                justifyItems={"center"}
                alignItems={"center"}
              >
                <LottieView
                  autoPlay
                  loop
                  style={{
                    width: 300,
                    height: 300,
                  }}
                  source={require("~/assets/animations/driver.json")}
                />
              </Box>
              <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                enableOnAndroid
                enableAutomaticScroll={Platform.OS === "ios"}
              >
                <View>
                  <TextInputMask
                    type="cpf"
                    customTextInput={InputCPF}
                    includeRawValueInChangeText={true}
                    options={{
                      format: "999.999.999-99",
                    }}
                    onChangeText={(text) => setFields({ ...fields, cpf: text })}
                    // InputLeftElement={<Icon as={<User />} ml={2} />}
                    value={fields.cpf}
                  />
                  <TextInputMask
                    type={"only-numbers"}
                    maxLength={11}
                    customTextInput={InputCNH}
                    onChangeText={(text) => setFields({ ...fields, cnh: text })}
                    // InputLeftElement={<Icon as={<User />} ml={2} />}
                    value={fields.cnh}
                  />
                </View>

                <Button
                  title="Virar Motorista"
                  onPress={handleSubmit}
                  fontColor="white"
                  mt={2}
                  isLoading={isLoading}
                />
              </KeyboardAwareScrollView>
            </>
          )}
        </ScreenContent>
      </Background>
    </>
  );
};
