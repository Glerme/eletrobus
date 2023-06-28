import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { House, Gear, MapPinLine, Path } from "phosphor-react-native";
import { ButtonTab, Container, Content } from "./styles";
import { THEME } from "~/styles/theme";

export function CustomTabBar({ state, descriptors, navigation }: any) {
  const Icon = (route: string) => {
    switch (route) {
      case "homeTab":
        return <House color={THEME.colors.white} />;
      case "mapTab":
        return <MapPinLine color={THEME.colors.white} />;
      case "routesTab":
        return <Path color={THEME.colors.white} />;
      case "settingsTab":
        return <Gear color={THEME.colors.white} />;
    }
  };

  return (
    <Container>
      <Content mb={Platform.OS === "ios" ? "38px" : "24px"}>
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <ButtonTab
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <View style={{ alignItems: "center", padding: 4 }}>
                <View
                  style={{
                    padding: 8,
                    borderRadius: 99,
                    backgroundColor: isFocused
                      ? THEME.colors.primary[700]
                      : "transparent",
                  }}
                >
                  {Icon(route.name)}
                </View>
              </View>
            </ButtonTab>
          );
        })}
      </Content>
    </Container>
  );
}
