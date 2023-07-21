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

import { Status } from "~/components/Status";
import { HourCard } from "~/components/HourCard";
import { Button } from "~/components/Form/Button";
import { EStatus } from "~/components/Status/EStatus";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";
import { ScrollViewContainer } from "~/components/Layouts/ScrollViewContainer";

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
      <ScreenContent>
        <ScrollViewContainer>
          <VStack space={4}>
            <HStack alignItems={"center"}>
              <Box>
                <Text fontSize={"lg"} fontWeight={"600"}>
                  UNIP - BAURU
                </Text>
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
              <HStack alignItems={"flex-start"} mb={2}>
                <VStack space={1}>
                  <Text fontWeight={500} fontSize="sm">
                    Saida: 10h
                  </Text>
                  <Text fontWeight={500} fontSize="sm">
                    Chegada: 23h
                  </Text>
                </VStack>
                <Spacer />
                <Status status={EStatus.DISPONIVEL} />
              </HStack>

              <FlatList
                data={mockedData}
                horizontal
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => <HourCard isToday={item.isToday} />}
              />
            </Box>
            <Spacer />
            <Box>
              <Text fontSize={"md"} fontWeight={"500"}>
                Observação
              </Text>
              <Box>
                <Text fontSize="sm" color={"gray.700"}>
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
        </ScrollViewContainer>
      </ScreenContent>
    </Background>
  );
};
