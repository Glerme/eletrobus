import api from "../axios";
import { UserProps } from "~/interfaces/User.interface";
import { FavoriteBusStopInterface } from "~/interfaces/FavoriteBusStop.interface";

export const getFavoritesService = async (user: UserProps | null) => {
  if (user) {
    const { data } = await api.get<FavoriteBusStopInterface>(
      `/user/favorite/bus-stop`
    );
    return data?.data;
  } else {
    return [];
  }
};
