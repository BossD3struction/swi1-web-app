import {User} from "./user";
import {Movie} from "./movie";

export interface Review {
  id: number;
  user: User[];
  movie: Movie[];
  text: string;
}
