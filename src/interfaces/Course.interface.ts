export interface CourseInterface {
  data: CourseProps[];
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface CourseProps {
  user_id: string;
  vehicle_id: string;
  route_id: string;
  initial_hour: string;
  final_hour: string;
  route_name: string;
}
