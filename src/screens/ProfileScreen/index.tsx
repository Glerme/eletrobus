import { ScrollView, Text } from "native-base";

import { NavigationProps } from "~/routes";

import { Background } from "~/components/Layouts/Background";
import { ImagePicker } from "~/components/Form/ImagePicker";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

export const ProfileScreen = ({
  navigation,
  route,
}: NavigationProps<"Profile">) => {
  console.log({
    navigation,
    route,
  });

  return (
    <Background>
      <ScrollView>
        <ScreenContent>
          <Text>Profile Screen</Text>
          <Text>{route.params.userId}</Text>

          <ImagePicker />

          <Text>{route.params.userId}</Text>
        </ScreenContent>
      </ScrollView>
    </Background>
  );
};
