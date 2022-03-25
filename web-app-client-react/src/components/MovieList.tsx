import {useEffect, useState} from "react";
import axios from 'axios';

const MovieList = () => {

    const url = "http://localhost:8080/movie/list";
    const [movies, setMovies] = useState<any>([]);

    useEffect(() => {
        axios.get(url)
            .then(response => {
                setMovies(response.data)
            })
    }, [url])

    return (
        <>
            <div className="card-body">
                <h2>List of Movies</h2>
                <div className="table-responsive-sm">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Year</th>
                            <th scope="col">Running Time</th>
                            <th scope="col">Banner Link</th>
                            <th scope="col">About</th>
                            <th scope="col">Genres</th>
                        </tr>
                        </thead>
                        <tbody>
                        {movies.map((movie: any) => (
                            <tr key={movie.id}>
                                <td>{movie.id}</td>
                                <td>{movie.name}</td>
                                <td>{movie.year}</td>
                                <td>{movie.runningTime}</td>
                                <td>{movie.bannerLink}</td>
                                <td>{movie.about}</td>
                                {movie.genres.map((genre: any) => (
                                    <td key={genre.id}>{genre.name}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MovieList;
