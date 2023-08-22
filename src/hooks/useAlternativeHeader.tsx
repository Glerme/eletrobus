import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IconButton } from "native-base";
import { CaretLeft } from "phosphor-react-native";
import { useLayoutEffect } from "react";

interface UseAlternativeHeaderProps {
  navigation: NativeStackNavigationProp<any>;
  title: string;
}
export const useAlternativeHeader = ({ title }: UseAlternativeHeaderProps) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
      headerStyle: {
        backgroundColor: "#0DAC86",
      },
      statusBarStyle: "light",
      statusBarColor: "#0DAC86",
      contentStyle: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerShadowVisible: false,
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
