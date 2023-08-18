import { useEffect, useState } from "react";

import { HStack, Text } from "native-base";
import { ArrowRight, Timer } from "phosphor-react-native";

import { RouteInterface } from "~/interfaces/Route.interface";

import { diferenceTimeSeconds, formatSecounds } from "~/utils/format";

interface StatusTime {
  busRoute: RouteInterface;
}

export const StatusTime = ({ busRoute }: StatusTime) => {
  const [time, setTime] = useState(0);
  let interval: any;

  useEffect(() => {
    // if (busRoute.trafegando) {
    //   setTime(diferenceTimeSeconds(busRoute.saida));
    //   clearInterval(interval);
    //   incrementTime();
    // } else {
    //   setTime(0);
    // }
  }, [busRoute.saida]);

  const incrementTime = () => {
    interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
  };

  // const [favorite, setFavorite] = useState(route?.favorite);

  const getStatusRun = (r: RouteInterface) => {
    // if (r.trafegando) {
    //   return "Em andamento";
    // } else if (!r.trafegando && diferenceTimeSeconds(new Date()) < 3600) {
    //   return "Aguardando";
    // } else {
    //   return "Finalizado";
    // }
  };

  return (
    <HStack alignItems={"center"} space={1}>
      <Timer size={22} />
      <ArrowRight size={14} color="#080808" />
      <Text fontSize="md" color="coolGray.700" lineHeight={"md"}>
        {formatSecounds(time)}
      </Text>
    </HStack>
  );
};
