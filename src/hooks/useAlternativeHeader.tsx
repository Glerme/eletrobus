import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IconButton } from "native-base";
import { CaretLeft } from "phosphor-react-native";
import { useLayoutEffect } from "react";

interface UseAlternativeHeaderProps {
  navigation: NativeStackNavigationProp<any>;
  title: string;
}
export const useAlternativeHeader = ({
  navigation,
  title,
}: UseAlternativeHeaderProps) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerBackTitleVisible: false, // Ocultar o título de retorno
      headerStyle: {
        backgroundColor: "#0DAC86",
      },
      statusBarStyle: "light",
      statusBarColor: "#0DAC86",
      contentStyle: {
        elevation: 0, // Remover a borda do cabeçalho no Android
        shadowOpacity: 0, // Remover a borda do cabeçalho no iOS
        borderBottomWidth: 0, // Remover a borda do cabeçalho
      },
      headerShadowVisible: false, // applied here
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerLeft: () => (
        <IconButton
          onPress={() => navigation.goBack()}
          marginRight={"2"}
          marginLeft={"-14px"}
        >
          <CaretLeft color="white" />
        </IconButton>
      ),
    });
  }, [navigation]);
};
