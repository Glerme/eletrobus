export interface CourseInterface {
  data: CourseProps[];
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CourseProps {
  driver: Driver;
  final_hour: string;
  initial_hour: string;
  institution: Institution;
  name: string;
  route: Route;
  vehicle: Vehicle;
  id: string;
}

export interface CourseDataProps {
  id: string;
  name: string;
  bus_stops: [
    {
      bus_stop: {
        id: string;
        latitude: number;
        longitude: number;
        name: string;
      };
      bus_stop_id: string;
      latitude: number;
      longitude: number;
    }
  ];
}

export interface Driver {
  avatar: any;
  name: string;
}

export interface Institution {
  avatar: any;
  name: string;
}

export interface Route {
  id: string;
  name: string;
}

export interface Vehicle {
  plate: string;
}
