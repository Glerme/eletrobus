import { RefreshControl, TouchableHighlight } from "react-native";

import { useInfiniteQuery } from "@tanstack/react-query";
import { MagnifyingGlass } from "phosphor-react-native";
import { Box, FlatList, HStack, Icon, Text, View } from "native-base";

import { NavigationProps } from "~/routes";

import { api } from "~/services/axios";

import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

import { CourseInterface, CourseProps } from "~/interfaces/Course.interface";

import { Alert } from "~/components/Alert";
import { Input } from "~/components/Form/Input";
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

export interface IFilters {
  kindRoute: "todos" | "municipal" | "intermunicipal";
  cities: ICity[];
  district: ICity[];
  // runStarted: boolean;
  time: Date;
}

export const CoursesScreen = ({
  navigation,
  route,
}: NavigationProps<"Courses">) => {
  const {
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
    error,
    isError,
    refetch,
  } = useInfiniteQuery(
    ["courses"],
    ({ pageParam = 0 }) => {
      const pageSize = 10;

      return api.get<CourseInterface>(
        `/course?page=${pageParam}&pageSize=${pageSize}`
      );
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage?.data?.hasNextPage
          ? allPages.length + 1
          : undefined;

        return nextPage;
      },
      keepPreviousData: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
    }
  );

  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  if (isError) {
    const axiosError = axiosErrorHandler(error);
    console.error(axiosError);

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
              Listagem - percursos
            </Text>
          </Box>

          <View flex={1}>
            <FlatList
              keyExtractor={(item, i) => `${i}`}
              data={data?.pages?.flatMap((page) =>
                page ? page?.data?.data : []
              )}
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
              ListEmptyComponent={() => (
                <Alert
                  status="info"
                  text="Atenção! Sem Percursos cadastrados no momento!"
                />
              )}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.1}
              ListFooterComponent={() => {
                if (!data?.pages?.flatMap((page) => page?.data?.hasNextPage)) {
                  return <></>;
                }

                return (
                  <>
                    {[...Array(5).keys()].map((_, index) => (
                      <ListCourses isLoading key={index} />
                    ))}
                  </>
                );
              }}
            />
          </View>
        </Container>
      </Background>
    </>
  );
};
