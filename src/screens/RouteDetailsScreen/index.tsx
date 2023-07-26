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
import { Info, Star } from "phosphor-react-native";
import { NavigationProps } from "~/routes";

import { HourCard } from "~/components/HourCard";
import { Button } from "~/components/Form/Button";
import { EStatusType } from "~/components/StatusInfo/EStatusType";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";
import { ScrollViewContainer } from "~/components/Layouts/ScrollViewContainer";
import { StatusInfo } from "~/components/StatusInfo";
import { RouteStudents } from "~/components/RouteCard/RouteStudents";

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
        <VStack space={4} flex={1}>
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
              <VStack space={1} alignItems="flex-end">
                <StatusInfo statusCorrida={EStatusType.EM_MOVIMENTO} />
                <RouteStudents mt={1} tipo={"estudantes"} />
              </VStack>
            </HStack>

            <FlatList
              data={mockedData}
              horizontal
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => <HourCard isToday={item.isToday} />}
            />
          </Box>

          <Box>
            <HStack alignItems={"center"} space={1} mb={1}>
              <Info size={18} color="#e8b10e" weight="duotone" />
              <Text fontSize={"sm"} fontWeight={"500"}>
                Observação
              </Text>
            </HStack>
            <ScrollViewContainer maxH={120}>
              <Text fontSize={"sm"} flex={1} color={"gray.700"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                officia, ex, dignissimos assumenda libero reiciendis possimus
                officia, ex, dignissimos assumenda libero reiciendis possimus
                ipsam repudiandae eligendi repellendus blanditiis rerum saepe
                numquam! numquam! numquam! numquam! numquam!
              </Text>
            </ScrollViewContainer>
          </Box>
          <Spacer />
          <Box>
            <Button
              onPress={() => console.log("click")}
              title="Acompanhar Viagem"
              fontColor={"white"}
            />
          </Box>
        </VStack>
      </ScreenContent>
    </Background>
  );
};
