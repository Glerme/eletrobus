import { useEffect, useState } from "react";
import { Platform } from "react-native";

import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import { Box, Icon, IconButton, View } from "native-base";
import {
  Envelope,
  Eye,
  EyeSlash,
  Fingerprint,
  IdentificationCard,
  Key,
  User,
} from "phosphor-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
import { updateDriverService } from "~/services/ProfileServices/updateDriverService";

interface ProfileFields {
  name: string;
  email: string;
  password?: string;

  cpf: string;
  cnh: string;
}

export const InputCNH = ({ ...rest }) => (
  <Input
    mb={2}
    placeholder="CNH"
    InputLeftElement={<Icon as={<IdentificationCard />} ml={2} />}
    {...rest}
  />
);
export const InputCPF = ({ ...rest }) => (
  <Input
    mb={2}
    placeholder="CPF"
    InputLeftElement={<Icon as={<Fingerprint />} ml={2} />}
    {...rest}
  />
);

export const ProfileScreen = ({
  navigation,
  route,
}: NavigationProps<"Profile">) => {
  const { user, updateUser, getRefreshToken } = useAuth();
  const [showPassword, setShowPassword] = useState(true);
  const [fields, setFields] = useState<ProfileFields>({
    name: "",
    email: "",
    password: "",
    cpf: "",
    cnh: "",
  });

  const updateUserAndDriver = async (fields: ProfileFields) => {
    try {
      if (user?.user?.driver) {
        await updateDriverService({
          cnh: fields.cnh,
          cpf: fields.cpf,
        });

        await updateUserService({
          email: fields.email,
          name: fields.name,
          password: fields.password,
        });
      } else {
        await updateUserService({
          email: fields.email,
          name: fields.name,
          password: fields.password,
        });
      }
    } catch (error) {
      return error;
    }
  };

  const { mutate, isLoading } = useMutation(updateUserAndDriver, {
    onMutate: async () => {
      setSignOutFunction(getRefreshToken);
    },
    onSuccess: async () => {
      const { data } = await api.get<MyQueryInterface>("/user/my");

      updateUser(data);

      Toast.show({
        type: "success",
        text1: "Sucesso",
        text2: `Informações atualizadas com sucesso!`,
      });
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

  useEffect(() => {
    setFields({
      name: user?.user?.name ?? "",
      email: user?.user?.email ?? "",
      cpf: user?.user?.driver?.cpf ?? "",
      cnh: user?.user?.driver?.cnh ?? "",
      password: "",
    });
  }, [user]);

  const handleSubmit = async () => {
    mutate(fields);
  };

  return (
    <>
      <Background>
        <ScreenContent>
          <Title>Perfil</Title>

          {user && (
            <>
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
                  <Input
                    placeholder="Nome"
                    mb={2}
                    onChangeText={(text) =>
                      setFields({ ...fields, name: text })
                    }
                    InputLeftElement={<Icon as={<User />} ml={2} />}
                    value={fields.name}
                  />
                  <Input
                    placeholder="Email"
                    keyboardType="email-address"
                    InputLeftElement={<Icon as={<Envelope />} ml={2} />}
                    mb={2}
                    onChangeText={(text) =>
                      setFields({ ...fields, email: text })
                    }
                    value={fields.email}
                  />

                  {user.user.driver && (
                    <>
                      <TextInputMask
                        type="cpf"
                        customTextInput={InputCPF}
                        includeRawValueInChangeText={true}
                        options={{
                          format: "999.999.999-99",
                        }}
                        onChangeText={(text) =>
                          setFields({ ...fields, cpf: text })
                        }
                        // InputLeftElement={<Icon as={<User />} ml={2} />}
                        value={fields.cpf}
                      />
                      <TextInputMask
                        type={"only-numbers"}
                        maxLength={11}
                        customTextInput={InputCNH}
                        onChangeText={(text) =>
                          setFields({ ...fields, cnh: text })
                        }
                        // InputLeftElement={<Icon as={<User />} ml={2} />}
                        value={fields.cnh}
                      />
                    </>
                  )}

                  <Input
                    placeholder="Senha"
                    InputLeftElement={<Icon as={<Key />} ml={2} />}
                    onChangeText={(text) =>
                      setFields({ ...fields, password: text })
                    }
                    secureTextEntry={showPassword}
                    type={showPassword ? "text" : "password"}
                    InputRightElement={
                      <IconButton
                        onPress={() => setShowPassword(!showPassword)}
                        borderRadius={"full"}
                        mr={2}
                        p={2}
                      >
                        <Icon
                          as={showPassword ? <Eye /> : <EyeSlash />}
                          mr={2}
                        />
                      </IconButton>
                    }
                  />
                </View>

                <Button
                  title="Salvar"
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
