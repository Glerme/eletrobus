export interface UserGoogleProps {
  email: string;
  family_name?: string;
  given_name?: string;
  id: string;
  locale?: string;
  name: string;
  picture?: string | null;
  verified_email?: boolean;
}

export interface UserProps {
  token: string;
  user: {
    id: string;
    avatar: string;
    email: string;
    name: string;
    driver: Driver | null;
    favorite: FavoriteBusStops;
  };
}

export interface Driver {
  id: string;
  cnh: string;
  cpf: string;
}

export interface FavoriteBusStops {
  bus_stops: [];
  routes: [];
}
