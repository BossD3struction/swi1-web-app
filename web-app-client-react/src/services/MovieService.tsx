import Movie from "../models/Movie";

export class MovieService {

    public async addMovie(movie: Movie) {
        const response = await fetch("http://localhost:8080/movie/create/angular", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({movie})
        })
        return await response.json();
    }

}
