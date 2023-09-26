import { createContext, useContext, useState } from "react";
import {
  LocationAccuracy,
  LocationObject,
  getCurrentPositionAsync,
  watchPositionAsync,
  requestBackgroundPermissionsAsync,
} from "expo-location";

interface LocationContextProps {
  location: LocationObject | null;
  locationError: string | null;
  getActualCurrentPosition: () => void;
  requestLocationPermissions: () => void;
}

interface LocationContextProviderProps {
  children: React.ReactNode;
}

export const LocationContext = createContext<LocationContextProps>({
  location: null,
  locationError: null,
  getActualCurrentPosition: () => {},
  requestLocationPermissions: () => {},
});

export const LocationContextProvider = ({
  children,
}: LocationContextProviderProps) => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestLocationPermissions = async () => {
    const { granted } = await requestBackgroundPermissionsAsync();

    if (granted) {
      try {
        const currentPosition = await getCurrentPositionAsync({});

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
        accuracy: LocationAccuracy.Highest,
        timeInterval: 5000,
        distanceInterval: 10,
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
