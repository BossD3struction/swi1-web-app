import {Movie} from "./movie";

export class Genre {
  id: number | undefined;
  name: string | undefined;
  movies: Movie[] | undefined;
}
