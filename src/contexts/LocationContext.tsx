import { createContext, useContext, useState } from "react";
import {
  LocationAccuracy,
  LocationObject,
  getCurrentPositionAsync,
  watchPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

interface LocationContextProps {
  location: LocationObject | null;
  locationError: string | null;
  getActualCurrentPosition: () => Promise<void>;
  requestLocationPermissions: () => Promise<void>;
}

interface LocationContextProviderProps {
  children: React.ReactNode;
}

export const LocationContext = createContext<LocationContextProps>({
  location: null,
  locationError: null,
  getActualCurrentPosition: async () => {},
  requestLocationPermissions: async () => {},
});

export const LocationContextProvider = ({
  children,
}: LocationContextProviderProps) => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestLocationPermissions = async () => {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      try {
        const currentPosition = await getCurrentPositionAsync({
          accuracy: LocationAccuracy.Highest,
          timeInterval: 5000,
        });

        setLocation(currentPosition);
      } catch (error) {
        setLocationError("Falha ao buscar a localização.");
      }
      return;
    }

    setLocationError("Permita o acesso à localização para continuar.");
    return;
  };

  const getActualCurrentPosition = async () => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.BestForNavigation,
        timeInterval: 10000,
        distanceInterval: 200,
      },
      (response) => {
        setLocation(response);
      }
    );
  };

  return (
    <LocationContext.Provider
      value={{
        getActualCurrentPosition,
        requestLocationPermissions,
        location,
        locationError,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);

  if (!context) {
    throw new Error("useLocation must be used within a LocationContext");
  }

  return context;
};
