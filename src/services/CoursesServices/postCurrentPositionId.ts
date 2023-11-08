import api from "../axios";

interface ParamsProps {
  id: string;

  latitude: number;
  longitude: number;
}

export const postCurrentPositionId = async ({
  id,
  latitude,
  longitude,
}: ParamsProps) => {
  console.log(id, latitude, longitude);
  return api.post(`course/current-position/${id}`, {
    latitude: `${latitude}`,
    longitude: `${longitude}`,
  });
};
