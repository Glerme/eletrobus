import { TouchableHighlight } from "react-native";
import { Box, Center, Icon, Text, VStack } from "native-base";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

interface CardButtonProps {
  onPress: () => void;
  name: string;
  icon: "bus-alt" | "seat-passenger";
}

export const CardButton = ({ name, icon, onPress }: CardButtonProps) => {
  return (
    <TouchableHighlight onPress={onPress}>
      <VStack background={"#6D6695"} p={2} borderRadius={4}>
        <Box>
          <Box>
            <Center>
              <Box
                borderWidth={4}
                borderColor={"fuchsia.800"}
                borderRadius={"full"}
                p={2}
                backgroundColor={"white"}
              >
                <Icon
                  as={
                    icon === "bus-alt" ? FontAwesome5 : MaterialCommunityIcons
                  }
                  name={icon}
                  size={10}
                  color={"black"}
                />
              </Box>
            </Center>
          </Box>
        </Box>

        <VStack>
          <Center>
            <Text fontSize={"lg"} color={"white"}>
              {name}
            </Text>
          </Center>
        </VStack>
      </VStack>
    </TouchableHighlight>
  );
};
