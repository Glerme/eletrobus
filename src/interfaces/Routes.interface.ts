export interface RoutesProps {
  id: string;
  name: string;
  course: {
    initial_hour: string;
    final_hour: string;
  }[];
}
