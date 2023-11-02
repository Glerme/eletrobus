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
  refresh_token: string | null;
  user: UserInterface;
}

export interface UserInterface {
  id: string;
  avatar: string;
  email: string;
  name: string;
  driver: Driver | null;
  favorite_bus_stop: FavoriteBusStops[];
  favorite_route: FavoriteRoutes[];
}

export interface Driver {
  id: string;
  cnh: string;
  cpf: string;
}

export interface FavoriteBusStops {
  description: string;
  id: string;
  name: string;
  images: string[];
}

export interface FavoriteRoutes {
  id: string;
  name: string;
}

export interface MyQueryInterface {
  data: UserInterface;
}
