import { TouchableOpacity, StyleSheet } from "react-native";

import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Avatar, Box, IconButton, Spacer, Text, View } from "native-base";
import { ArrowLeft, List } from "phosphor-react-native";

import { ROUTES_SCREENS } from "~/constants/routes";

import { THEME } from "~/styles/theme";

import { HeaderBackButton } from "@react-navigation/elements";

export const Header = ({ navigation, title }: any) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <HeaderBackButton tintColor="white" onPress={handleGoBack} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "blue",
    height: 60,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

// interface HeaderProps {
//   openDrawer: () => void;
// }

// export const Header = ({ openDrawer }: HeaderProps) => {
//   const routesToShowGoBack = [
//     ROUTES_SCREENS.ROUTE_DETAILS_SCREEN,
//     ROUTES_SCREENS.FAVORITES_SCREEN,
//   ];

//   return (
//     <Box
//       display="flex"
//       alignItems={"center"}
//       p={2}
//       flexDir={"row"}
//       background={"#0DAC86"}
//     >
//       {/* {showGoBack ? (
//         <>
//           <IconButton
//             icon={<ArrowLeft size={24} color={THEME.colors.white} />}
//             onPress={() => navigation.goBack()}
//           />
//         </>
//       ) : ( */}
//       <>
//         <IconButton
//           icon={<List size={24} color={THEME.colors.white} />}
//           onPress={openDrawer}
//         />

//         <Spacer />

//         <TouchableWithoutFeedback onPress={() => console.log("AQUI")}>
//           <Avatar
//             w={"45px"}
//             h={"45px"}
//             source={{
//               uri: "https://avatars.githubusercontent.com/u/60005589?v=4",
//             }}
//           />
//         </TouchableWithoutFeedback>
//       </>
//       {/* )} */}
//     </Box>
//   );
// };
