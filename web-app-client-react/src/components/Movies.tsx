import {FC, useEffect, useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {TokenStorageService} from "../services/TokenStorageService";
import {Models} from "./Models";

export const Movies: FC = () => {

    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();
    const url = "http://localhost:8080/movie/list";

    const [movies, setMovies] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLoggedIn === null) {
            navigate('/home');
        } else {
            axios.get(url).then(response => {
                setMovies(response.data)
            })
        }
    }, [isUserLoggedIn, navigate, url]);
    return (
        <>
            <Models/>
            <div className="card-body">
                <h2>Movies</h2>
                <div className="table-responsive-sm">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">name</th>
                            <th scope="col">year</th>
                            <th scope="col">runtime</th>
                            <th scope="col">banner link</th>
                            <th scope="col">about</th>
                            <th scope="col">genres</th>
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
                                <td>
                                    <ul>
                                        {movie.genres.map((genre: any) => (
                                            <li key={movie.id + genre.id}>{genre.name}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
