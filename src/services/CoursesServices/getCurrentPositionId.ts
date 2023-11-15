import api from "../axios";

export interface IGetCurrentPositionId {
  data: {
    current_position: ICurrentPosition;
  };
}

export interface ICurrentPosition {
  id: string;
  curse_id: string;
  user_id: string;
  latitude: string;
  longitude: string;
  created_at: string;
}

export const getCurrentPositionId = async (
  id: string
): Promise<IGetCurrentPositionId> => {
  const { data } = await api.get(`course/current-position/${id}`);
  return data;
};
