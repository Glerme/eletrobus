export interface FavoriteCourseInterface {
  data: FavoriteCourseProps[];
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface FavoriteCourseProps {
  id: string;
  route: { id: string; name: string };
  route_id: string;
  user_id: string;
}
