import { useState } from "react";
import { RefreshControl } from "react-native";

import { MagnifyingGlass } from "phosphor-react-native";
import { Box, FlatList, Icon, Text } from "native-base";
import { useInfiniteQuery } from "@tanstack/react-query";

import { NavigationProps } from "~/routes";

import { getBusStopsService } from "~/services/PointsScreenServices/getBusStopsService";

import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

import { BusStopInterface, BusStopProps } from "~/interfaces/BusStop.interface";

import { Alert } from "~/components/Alert";
import { Input } from "~/components/Form/Input";
import { StatusBar } from "~/components/StatusBar";
import { ListBusStops } from "~/components/ListBusStops";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";
import { Container } from "./styles";

export interface ICity {
  id: number;
  name: string;
  favorite: boolean;
}

export const PointsScreen = ({
  navigation,
  route,
}: NavigationProps<"Points">) => {
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
    ["bus-stop", queryString],
    ({ pageParam = 0 }) => getBusStopsService({ pageParam, queryString }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage?.data?.hasNextPage
          ? allPages.length
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
      <StatusBar />
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

          <Box mt={6} flex={1}>
            <Text
              fontSize={"md"}
              color={THEME.colors.gray["800"]}
              fontWeight={"600"}
              mb={1}
            >
              Listagem - pontos
            </Text>
            <FlatList
              flex={1}
              keyExtractor={(item, i) => `${i}`}
              data={data?.pages?.flatMap((page) =>
                page ? page?.data?.data : []
              )}
              refreshControl={
                <RefreshControl onRefresh={refetch} refreshing={isFetching} />
              }
              renderItem={({ item }: { item: BusStopProps }) => (
                <ListBusStops
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
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() => {
                if (!hasNextPage) {
                  return <></>;
                }

                return (
                  <>
                    {[...Array(5).keys()].map((_, index) => (
                      <ListBusStops isLoading key={index} />
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
