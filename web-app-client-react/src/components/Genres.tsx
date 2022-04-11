import {FC, useEffect, useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {TokenStorageService} from "../services/TokenStorageService";
import {Models} from "./Models";

export const Genres: FC = () => {

    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();
    const url = "http://localhost:8080/genre/list";

    const [genres, setGenres] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLoggedIn === null) {
            navigate('/home');
        } else {
            axios.get(url).then(response => {
                setGenres(response.data)
            })
        }
    }, [isUserLoggedIn, navigate, url]);
    return (
        <>
            <Models/>
            <div className="card-body">
                <h2>Genres</h2>
                <div className="table-responsive-sm">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {genres.map((genre: any) => (
                            <tr key={genre.id}>
                                <td>{genre.id}</td>
                                <td>{genre.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
