import { useState } from "react";
import { RefreshControl } from "react-native";

import { MagnifyingGlass } from "phosphor-react-native";
import { Box, FlatList, Icon, Text } from "native-base";
import { useInfiniteQuery } from "@tanstack/react-query";

import { NavigationProps } from "~/routes";

import { useAuth } from "~/contexts/AuthContext";

import { getCoursesService } from "~/services/CoursesServices/getCoursesService";

import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

import { CourseProps } from "~/interfaces/Course.interface";

import { Alert } from "~/components/Alert";
import { Input } from "~/components/Form/Input";
import { StatusBar } from "~/components/StatusBar";
import { ListCourses } from "~/components/ListCourses";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";
import { Container } from "./styles";

export const CoursesScreen = ({
  navigation,
  route,
}: NavigationProps<"Courses">) => {
  const { getRefreshToken } = useAuth();
  const [queryString, setQueryString] = useState<string>("");

  const {
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
    error,
    isError,
    refetch,
  } = useInfiniteQuery(
    ["course", queryString],
    ({ pageParam = 0 }) =>
      getCoursesService({ pageParam, queryString, getRefreshToken }),
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
          <Input
            placeholder="Pesquisar"
            InputRightElement={<Icon as={<MagnifyingGlass />} mr={2} />}
            onChangeText={(text) => {
              setQueryString(text);
            }}
            value={queryString}
          />

          <Box mt={6} mb={2}>
            <Text
              fontSize={"md"}
              color={THEME.colors.gray["800"]}
              fontWeight={"600"}
            >
              Listagem - percursos
            </Text>

            <FlatList
              keyExtractor={(item, i) => `${i}`}
              data={data?.pages?.flatMap((page) => {
                return page ? page?.data?.data : [];
              })}
              refreshControl={
                <RefreshControl onRefresh={refetch} refreshing={isFetching} />
              }
              renderItem={({ item }: { item: CourseProps }) => (
                <ListCourses
                  item={item}
                  onPress={() => {
                    navigation.navigate("CouseDetails", {
                      id: `${item?.route.id}`,
                    });
                  }}
                  key={item?.route.id}
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
                if (!hasNextPage) {
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
          </Box>
        </Container>
      </Background>
    </>
  );
};
