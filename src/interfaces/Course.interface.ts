import { EStatusRun } from "~/enum/EStatusRun";

export interface CourseInterface {
  data: CourseProps[];
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CourseProps {
  id: string;
  initial_hour: string;
  final_hour: string;
  name: string;
  id_route: string;
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
  courses: {
    id: string;
    current_positions: {
      latitude: string;
      longitude: string;
    };
    vehicle?: Vehicle;
    status: EStatusRun;
  }[];
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
  id: string;
  institution_id: string;
  plate: string;
  broken: boolean;
}
