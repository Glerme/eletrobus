import { useRef, useState } from "react";
import { RefreshControl, TouchableHighlight } from "react-native";

import { useQuery } from "@tanstack/react-query";
import { MagnifyingGlass } from "phosphor-react-native";
import { Box, FlatList, HStack, Icon, Text, View } from "native-base";

import { NavigationProps } from "~/routes";

import { api } from "~/services/axios";

import { useAuth } from "~/contexts/AuthContext";

import { CourseInterface, CourseProps } from "~/interfaces/Course.interface";
import { BusStopInterface, BusStopProps } from "~/interfaces/BusStop.interface";

import { Alert } from "~/components/Alert";
import { Input } from "~/components/Form/Input";
import { ListItem } from "~/components/ListItem";
import { Button } from "~/components/Form/Button";
import { StatusBar } from "~/components/StatusBar";
import { ListCourses } from "~/components/ListCourses";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";
import { Container } from "./styles";

export interface ICity {
  id: number;
  name: string;
  favorite: boolean;
}

const courseMock: CourseProps[] = [
  {
    route_id: "ea17daf1-6de0-4f46-b0e7-4ee9207a1af6",
    initial_hour: "2023-10-08T17:03:21.204Z",
    final_hour: "2023-10-08T17:03:21.204Z",
    vehicle_id: "ea17daf1-6de0-4f46-b0e7-4ee9207a1af6",
    route_name: "Rota 1",
    user_id: "ea17daf1-6de0-4f46-b0e7-4ee9207a1af6",
  },
];

export const PointsScreen = ({
  navigation,
  route,
}: NavigationProps<"Points">) => {
  const { user } = useAuth();
  const pageRef = useRef(0);

  const [courses, setCourses] = useState<CourseInterface | null>(null);
  const [busStops, setBusStops] = useState<BusStopInterface | null>(null);

  const { isError, error, refetch, isFetching } = useQuery({
    queryKey: ["bus-stop", pageRef.current],
    queryFn: async () => {
      if (user?.driver) {
        const { data } = await api.get<CourseInterface>(
          `/course?page=${pageRef.current}&pageSize=10`
        );

        const oldData = courses?.data ?? [];

        setCourses(() => ({
          data: [...oldData, ...data.data],
          hasNextPage: data.hasNextPage,
          hasPreviousPage: data.hasPreviousPage,
          totalPages: data.totalPages,
        }));

        return data;
      } else {
        const { data } = await api.get<BusStopInterface>(
          `/bus-stop?page=${pageRef.current}&pageSize=2`
        );

        const oldData = busStops?.data ?? [];

        setBusStops(() => ({
          data: [...oldData, ...data.data],
          hasNextPage: data.hasNextPage,
          hasPreviousPage: data.hasPreviousPage,
          totalPages: data.totalPages,
        }));

        return data;
      }
    },
  });

  if (isError) {
    console.error(error);

    return (
      <>
        <StatusBar />

        <Background>
          <ScreenContent>
            <Alert status="error" />
          </ScreenContent>
        </Background>
      </>
    );
  }

  return (
    <>
      <StatusBar />
      <Background>
        <Container>
          <HStack space={1}>
            <View flex={1} alignItems={"center"}>
              <Input
                placeholder="Pesquisar"
                InputRightElement={
                  <TouchableHighlight onPress={() => console.log("filters")}>
                    <Icon as={<MagnifyingGlass />} mr={2} />
                  </TouchableHighlight>
                }
              />
            </View>
          </HStack>

          <Box mt={6} mb={2}>
            <Text
              fontSize={"md"}
              color={THEME.colors.gray["800"]}
              fontWeight={"600"}
            >
              Listagem
            </Text>
          </Box>

          <View flex={1}>
            {user?.driver ? (
              <FlatList
                keyExtractor={(item) => `${item?.vehicle_id}`}
                data={courses?.data}
                refreshControl={
                  <RefreshControl onRefresh={refetch} refreshing={isFetching} />
                }
                renderItem={({ item }: { item: CourseProps }) => (
                  <ListCourses
                    item={item}
                    onPress={() => {
                      navigation.navigate("CouseDetails", {
                        id: `${item?.vehicle_id}`,
                      });
                    }}
                    key={item?.vehicle_id}
                  />
                )}
              />
            ) : (
              <FlatList
                display={"flex"}
                keyExtractor={(item) => `${item?.id}`}
                data={busStops?.data}
                refreshControl={
                  <RefreshControl onRefresh={refetch} refreshing={isFetching} />
                }
                renderItem={({ item }: { item: BusStopProps }) => (
                  <ListItem
                    item={item}
                    onPress={() => {
                      navigation.navigate("PointDetails", {
                        id: `${item?.id}`,
                      });
                    }}
                    key={item.id}
                  />
                )}
                ListEmptyComponent={() => (
                  <Alert
                    status="info"
                    text="Atenção! Sem pontos cadastrados no momento!"
                  />
                )}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                  pageRef.current += 1;
                  refetch();
                }}
              />
            )}
          </View>
        </Container>
      </Background>
    </>
  );
};
