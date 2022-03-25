import Movie from "./Movie";

export default interface Genre {
    id: number;
    name: string;
    movies: Movie[];
}
