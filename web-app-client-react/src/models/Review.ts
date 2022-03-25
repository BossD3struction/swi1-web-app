import Movie from "./Movie";
import {User} from "./User";

export interface Review {
    id: number;
    user: User[];
    movie: Movie[];
    text: string;
}
