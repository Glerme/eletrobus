import { useState } from "react";

import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";

export const useRouteActive = () => {
  const [routeActive, setRouteActive] =
    useState<RoutesBusStopsInterface | null>(null);

  return { routeActive, setRouteActive };
};
