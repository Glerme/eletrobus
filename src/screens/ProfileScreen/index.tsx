import { useEffect, useState } from "react";
import { Platform } from "react-native";

import { Box, Text, View } from "native-base";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useAuth } from "~/contexts/AuthContext";

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
  const { user } = useAuth();

  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    newPassword: "",
  });

  useEffect(() => {
    setFields({
      name: user?.user?.name ?? "",
      email: user?.user?.email ?? "",
      password: "",
      newPassword: "",
    });
  }, [user]);

  return (
    <>
      <StatusBar />

      <Background>
        <ScreenContent>
          <Title>Profile Screen</Title>

          {user && (
            <>
              <Box mt={5} mb={5}>
                <ImagePicker user={user?.user} />
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
                    value={fields.name}
                  />
                  <Input
                    placeholder="Email"
                    keyboardType="email-address"
                    mb={2}
                    onChangeText={(text) =>
                      setFields({ ...fields, email: text })
                    }
                    value={fields.email}
                  />

                  <Input placeholder="Senha" secureTextEntry={true} mb={2} />

                  <Input placeholder="Nova Senha" secureTextEntry={true} />
                </View>

                <Button
                  title="Salvar"
                  onPress={() => console.log("salvar")}
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
