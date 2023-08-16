export interface IMap {
  markers: IMarker[];
}

export interface IMarker {
  id: string;
  title: string;
  image?: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  type: "point" | "bus";
}
