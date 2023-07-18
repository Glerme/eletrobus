import {
  Box,
  FlatList,
  HStack,
  Image,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { Star } from "phosphor-react-native";
import { NavigationProps } from "~/routes";

import { HourCard } from "~/components/HourCard";
import { Title } from "~/components/Layouts/Title";
import { Button } from "~/components/Form/Button";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

const mockedData = [
  {
    id: 1,
    name: "Bauru",
    isToday: true,
  },
  {
    id: 2,
    name: "São Paulo",
    isToday: false,
  },
  {
    id: 3,
    name: "Rio de Janeiro",
    isToday: false,
  },
  {
    id: 4,
    name: "Belo Horizonte",
    isToday: false,
  },
  {
    id: 5,
    name: "Porto Alegre",
    isToday: false,
  },
  {
    id: 6,
    name: "Porto Alegre",
    isToday: false,
  },
  {
    id: 7,
    name: "Porto Alegre",
    isToday: false,
  },
];

export const RouteDetailsScreen = ({
  navigation,
  route,
}: NavigationProps<"RouteDetails">) => {
  return (
    <Background>
      <ScrollView>
        <ScreenContent>
          <VStack space={4}>
            <HStack alignItems={"center"}>
              <Box>
                <Title>Unip/Unesp</Title>
              </Box>

              <Spacer />

              <Box>
                <Star size={22} weight="fill" color={"#E9C25F"} />
              </Box>
            </HStack>

            <Box w={"full"}>
              <Image
                source={{
                  uri: "https://wallpaperaccess.com/full/317501.jpg",
                }}
                w={"full"}
                h="56"
                borderRadius={"md"}
                alt="Alternate Text"
              />
            </Box>

            <Box>
              <Title size="sm">Horários</Title>
              <HStack alignItems={"center"}>
                <Box>
                  <Text fontSize="sm">Saída</Text>
                  <Text fontSize="sm">Entrada</Text>
                </Box>

                <Spacer />

                <Box>
                  <Text fontSize="sm">Disponivel</Text>
                </Box>
              </HStack>

              <FlatList
                data={mockedData}
                horizontal
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => <HourCard isToday={item.isToday} />}
              />
            </Box>

            <Box>
              <Title size="sm">Observação</Title>
              <Box>
                <Text fontSize="sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                  officia, ex, dignissimos assumenda libero reiciendis possimus
                  ipsam repudiandae eligendi repellendus blanditiis rerum saepe
                  numquam!
                </Text>
              </Box>
            </Box>

            <Box mb={10}>
              <Button
                onPress={() => console.log("click")}
                title="Acompanhar Viagem"
                fontColor={"white"}
              />
            </Box>
          </VStack>
        </ScreenContent>
      </ScrollView>
    </Background>
  );
};
