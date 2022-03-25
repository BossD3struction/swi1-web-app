import Movie from "../models/Movie";

export class MovieService {

    public async getMovies(): Promise<Movie> {
        const url = "http://localhost:8080/movie/list";
        const response = await fetch(url);
        return await response.json();
    }

    public async addMovie(movie: Movie) {
        const response = await fetch("http://localhost:8080/movie/create/angular", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({movie})
        })
        return await response.json();
    }

}
