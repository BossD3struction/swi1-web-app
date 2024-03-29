import {FC, useEffect, useState} from "react";
import {Button, Stack} from "react-bootstrap";
import {TokenStorageService} from "../services/TokenStorageService";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {UpdateMovieDialog} from "../dialogs/UpdateMovieDialog";
import {UpdateMovieDialogContext} from "../contexts/UpdateMovieDialogContext";
import {CreateMovieDialog} from "../dialogs/CreateMovieDialog";
import {CreateMovieDialogContext} from "../contexts/CreateMovieDialogContext";

export const MoviesManagement: FC = () => {

    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();
    const navigate = useNavigate();

    const [showUpdateMovieDialog, setShowUpdateMovieDialog] = useState(false);
    const [showCreateMovieDialog, setShowCreateMovieDialog] = useState(false);
    const [movies, setMovies] = useState<any>([]);
    const [genresFromDatabase, setGenresFromDatabase] = useState<any>([]);
    const [checkedGenresFromDatabase, setCheckedGenresFromDatabase] = useState<any>([]);

    let [selectedMovie, setSelectedMovie] = useState<any>([]);

    useEffect(() => {
        if (isUserLoggedIn === null) {
            navigate('/home');
        } else {
            axios.get('http://localhost:8080/movie/list').then(response => {
                setMovies(response.data)
            })
            axios.get('http://localhost:8080/genre/list').then(response => {
                setGenresFromDatabase(response.data);
            })
        }
    }, [isUserLoggedIn, navigate]);

    function deleteMovieRequest(result: any, id: number) {
        if (result.isConfirmed) {
            axios.defaults.headers.common = {'Authorization': `Bearer ${isUserLoggedIn}`}
            axios.delete(`http://localhost:8080/movie/${id}/delete`).then(async response => {
                await Swal.fire({
                    titleText: `${response.data.message}`,
                    icon: 'success',
                    confirmButtonText: 'Close'
                });
                window.location.reload();
            }).catch(async function (error) {
                if (error.toJSON().status === 403) {
                    await Swal.fire({
                        titleText: 'You don\'t have permissions!',
                        icon: 'error',
                        confirmButtonText: 'Close'
                    });
                }
                if (error.toJSON().status === 500) {
                    await Swal.fire({
                        titleText: 'Can\'t delete movie with active reviews',
                        icon: 'error',
                        width: 'auto',
                        confirmButtonText: 'Close'
                    });
                }
            });
        }
    }

    async function deleteMovie(id: number) {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                deleteMovieRequest(result, id);
            })
        } catch (err: any) {
            console.log(err);
        }
    }

    function openUpdateMovieDialog(id: number) {
        axios.get(`http://localhost:8080/movie/${id}`).then(response => {
            setSelectedMovie(response.data);
            const checkedGenresArray = response.data.genresId;
            setCheckedGenresFromDatabase(checkedGenresArray);
            setShowUpdateMovieDialog(true);
        })
    }

    return (
        <>
            <CreateMovieDialogContext.Provider value={{
                showCreateMovieDialog,
                setShowCreateMovieDialog,
                genresFromDatabase,
                isUserLoggedIn
            }}>
                <UpdateMovieDialogContext.Provider value={{
                    showUpdateMovieDialog,
                    setShowUpdateMovieDialog,
                    genresFromDatabase,
                    isUserLoggedIn,
                    selectedMovie,
                    checkedGenresFromDatabase
                }}>
                    <CreateMovieDialog/>
                    <UpdateMovieDialog/>
                    <div className="card-body">
                        <h2>
                            Movies
                            <Button className="float-end" variant="success" type="button"
                                    onClick={() => setShowCreateMovieDialog(true)}>Create</Button>
                        </h2>
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
                                    <th scope="col">actions</th>
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
                                        <td id="about">{movie.about}</td>
                                        <td>
                                            <ul>
                                                {movie.genres.map((genre: any) => (
                                                    <li key={movie.id + genre.id}>{genre.name}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>
                                            <Stack direction="horizontal" gap={3}>
                                                <Button variant="primary" type="button"
                                                        onClick={() => openUpdateMovieDialog(movie.id)}>Update</Button>
                                                <Button variant="danger" type="button"
                                                        onClick={() => deleteMovie(movie.id)}>Delete</Button>
                                            </Stack>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </UpdateMovieDialogContext.Provider>
            </CreateMovieDialogContext.Provider>
        </>
    )
}
