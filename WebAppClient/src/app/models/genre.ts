import {Movie} from "./movie";

export interface Genre {
  id: number | undefined;
  name: string | undefined;
  movies: Movie[] | undefined;
}
