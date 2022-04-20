import Movie from "../models/Movie";
import UpdateMovieRequest from "../models/request/UpdateMovieRequest";
import UpdateMovieResponse from "../models/response/UpdateMovieResponse";

//TODO might deprecate this
export class MovieService {

    public async addMovie(movie: Movie) {
        const response = await fetch("http://localhost:8080/movie/create/angular", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({movie})
        })
        return await response.json();
    }

    public async updateMovie(updateMovieRequest: UpdateMovieRequest): Promise<UpdateMovieResponse> {
        if (updateMovieRequest === null || updateMovieRequest === undefined)
            throw new Error('The updateMovieRequest cannot be null.');

        const response = await fetch("http://localhost:8080/movie/update", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updateMovieRequest)
        })

        if (!response.ok) {
            throw response;
        }

        return await response.json();
    }

}
