import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";

import Toast from "react-native-toast-message";
import { Box, Icon, IconButton, View } from "native-base";
import { Envelope, Eye, EyeSlash, Key, User } from "phosphor-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useAuth } from "~/contexts/AuthContext";

import api from "~/services/axios";

import { MyQueryInterface } from "~/interfaces/User.interface";

import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

import { NavigationProps } from "~/routes";

import { Input } from "~/components/Form/Input";
import { Button } from "~/components/Form/Button";
import { StatusBar } from "~/components/StatusBar";
import { Title } from "~/components/Layouts/Title";
import { ImagePicker } from "~/components/Form/ImagePicker";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

export const ProfileScreen = ({
  navigation,
  route,
}: NavigationProps<"Profile">) => {
  const { user, updateUser } = useAuth();
  const [showPassword, setShowPassword] = useState(true);

  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setFields({
      name: user?.user?.name ?? "",
      email: user?.user?.email ?? "",
      password: "",
    });
  }, [user]);

  const handleSubmit = async () => {
    try {
      const { status } = await api.put(`/user`, {
        name: fields?.name ?? undefined,
        email: fields?.email ?? undefined,
        password: fields?.password ? fields?.password : undefined,
      });

      if (status === 200) {
        const { data } = await api.get<MyQueryInterface>("/user/my");

        updateUser(data);
      } else {
        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Erro ao atualizar usuário",
        });
      }
    } catch (error) {
      const err = axiosErrorHandler(error);
      console.error(err);

      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro ao atualizar usuário",
      });
    }
  };

  return (
    <>
      <StatusBar />

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
                />
              </KeyboardAwareScrollView>
            </>
          )}
        </ScreenContent>
      </Background>
    </>
  );
};
