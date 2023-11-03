import api, { setSignOutFunction } from "../axios";
import { UserProps } from "~/interfaces/User.interface";

export const getFavoritesModalService = async (
  user: UserProps | null,
  getRefreshToken: () => void
) => {
  setSignOutFunction(getRefreshToken);
  if (user?.user?.driver) {
    const { data } = await api.get(`/user/favorite/courses`);
    return data?.data;
  } else if (user) {
    const { data } = await api.get(`/user/favorite/bus-stop?orderAsc=desc`);
    return data?.data;
  } else {
    return [];
  }
};
