import { RefreshControl } from "react-native";
import { Center, FlatList, Text, View } from "native-base";

import LottieView from "lottie-react-native";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useAuth } from "~/contexts/AuthContext";

import { NavigationProps } from "~/routes";

import { FavoriteBusStopProps } from "~/interfaces/FavoriteBusStop.interface";

import { getUserFavoritesBusStopsService } from "~/services/FavoritesServices/getUserFavoritesBusStopsService";

import { Alert } from "~/components/Alert";
import { StatusBar } from "~/components/StatusBar";
import { ListFavorites } from "~/components/ListFavorites";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

export const FavoritesScreenUser = ({
  navigation,
  route,
}: NavigationProps<"Favorites">) => {
  const { user, getRefreshToken } = useAuth();

  const { data, fetchNextPage, isFetching, hasNextPage, refetch } =
    useInfiniteQuery(
      ["favorites", user, route.key],
      ({ pageParam = 0 }) =>
        getUserFavoritesBusStopsService({ getRefreshToken, pageParam }),

      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = lastPage?.data?.hasNextPage
            ? allPages?.length + 1
            : undefined;

          return nextPage;
        },
        keepPreviousData: true,
      }
    );

  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  return (
    <>
      <StatusBar />
      <Background>
        <ScreenContent>
          <Text fontSize={"lg"} fontWeight={"600"}>
            Favoritos
          </Text>

          <Center>
            <LottieView
              autoPlay
              loop
              style={{
                width: 200,
                height: 200,
              }}
              source={require("~/assets/animations/favorites.json")}
            />
          </Center>

          <View flex={1}>
            <FlatList
              keyExtractor={(item, i) => `${i}`}
              data={data?.pages?.flatMap((page) =>
                page ? page?.data?.data : []
              )}
              refreshControl={
                <RefreshControl onRefresh={refetch} refreshing={isFetching} />
              }
              renderItem={({ item }: { item: FavoriteBusStopProps }) => (
                <ListFavorites
                  item={item}
                  onPress={() => {
                    navigation.navigate("PointDetails", {
                      id: `${item?.bus_stop_id}`,
                    });
                  }}
                  key={item.id}
                />
              )}
              ListEmptyComponent={() => (
                <Alert
                  status="info"
                  text="Atenção! Sem pontos de ônibus favoritados no momento!"
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
                      <ListFavorites isLoading key={index} />
                    ))}
                  </>
                );
              }}
            />
          </View>
        </ScreenContent>
      </Background>
    </>
  );
};
