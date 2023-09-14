import { useState } from "react";

import {
  Box,
  FlatList,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
  View,
} from "native-base";
import { Info } from "phosphor-react-native";

import { useAuth } from "~/contexts/AuthContext";

import { NavigationProps } from "~/routes";

import { HourCard } from "~/components/HourCard";
import { Button } from "~/components/Form/Button";
import { TypeRoute } from "~/components/TypeRoute";
import { Background } from "~/components/Layouts/Background";
import { StatusInfo } from "~/components/BusStatus/StatusInfo";
import { FavoriteButton } from "~/components/Form/FavoriteButton";
import { ScreenContent } from "~/components/Layouts/ScreenContent";
import { EStatusType } from "~/components/BusStatus/StatusInfo/EStatusType";
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
  const { user } = useAuth();

  const [favorite, setFavorite] = useState<boolean>(false);

  return (
    <Background>
      <ScreenContent>
        <ScrollViewContainer>
          <VStack space={4} flex={1}>
            <HStack alignItems={"center"}>
              <HStack space={2} alignItems="center">
                <View
                  width={4}
                  height={4}
                  borderRadius={50}
                  // backgroundColor={color}
                  backgroundColor={true ? "#A7E179" : "#E17979"}
                />
                <Text fontSize="lg" fontWeight={"600"}>
                  UNESP - Bauru
                </Text>
              </HStack>

              <Spacer />

              <FavoriteButton
                favorite={favorite}
                handlePress={() => setFavorite(!favorite)}
              />
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
                  <TypeRoute mt={1} tipo={"estudantes"} />
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
              <Text fontSize={"sm"} flex={1} color={"gray.700"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
                officia, ex, dignissimos assumenda libero reiciendis possimus
                officia, ex, dignissimos assumenda libero reiciendis possimus
                ipsam repudiandae eligendi repellendus blanditiis rerum saepe
                numquam! numquam! numquam! numquam! numquam!
              </Text>
            </Box>
            <Spacer />
            <Box>
              {user?.driver ? (
                <Button
                  onPress={() => console.log("click")}
                  title="Iniciar Viagem"
                  fontColor={"white"}
                />
              ) : (
                <Button
                  onPress={() => console.log("click")}
                  title="Acompanhar Viagem"
                  fontColor={"white"}
                />
              )}
            </Box>
          </VStack>
        </ScrollViewContainer>
      </ScreenContent>
    </Background>
  );
};
