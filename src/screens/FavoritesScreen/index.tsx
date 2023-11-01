import { RefreshControl } from "react-native";
import { Center, FlatList, Text, View } from "native-base";

import LottieView from "lottie-react-native";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useAuth } from "~/contexts/AuthContext";

import { NavigationProps } from "~/routes";

import {
  FavoriteBusStopInterface,
  FavoriteBusStopProps,
} from "~/interfaces/FavoriteBusStop.interface";

import api, { setSignOutFunction } from "~/services/axios";

import { Alert } from "~/components/Alert";
import { ListFavorites } from "~/components/ListFavorites";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

export const FavoritesScreen = ({
  navigation,
  route,
}: NavigationProps<"Favorites">) => {
  const { user, getRefreshToken, signOut } = useAuth();

  const { data, fetchNextPage, isFetching, hasNextPage, refetch } =
    useInfiniteQuery(
      ["favorites", user?.token, route.key],
      ({ pageParam = 0 }) => {
        const pageSize = 10;

        //! ADICIONAR EM TODOS OS REQUEST Q PRECISA DO USUARIO
        setSignOutFunction(getRefreshToken);

        return api.get<FavoriteBusStopInterface>(
          `/user/favorite/bus-stop?page=${pageParam}&pageSize=${pageSize}&orderAsc=desc`
        );
      },

      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = lastPage?.data?.hasNextPage
            ? allPages?.length + 1
            : undefined;

          return nextPage;
        },
        keepPreviousData: true,
        refetchOnWindowFocus: "always",
        refetchOnReconnect: "always",
        refetchOnMount: "always",
      }
    );

  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  };

  return (
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
  );
};
