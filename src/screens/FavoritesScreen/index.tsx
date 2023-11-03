import { useAuth } from "~/contexts/AuthContext";

import { NavigationProps } from "~/routes";

import { FavoritesScreenUser } from "./User";
import { FavoritesScreenDriver } from "./Driver";

export const FavoritesScreen = ({
  navigation,
  route,
}: NavigationProps<"Favorites">) => {
  const { user } = useAuth();

  return user?.user?.driver ? (
    <FavoritesScreenDriver navigation={navigation} route={route} />
  ) : (
    <FavoritesScreenUser navigation={navigation} route={route} />
  );
};
