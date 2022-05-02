import React, {FC, useEffect, useState} from "react";
import axios from "axios";
import Movie from "../models/Movie";
import {MovieReviewsDialogContext} from "../contexts/MovieReviewsDialogContext";
import {MovieReviewsDialog} from "../dialogs/MovieReviewsDialog";

export const MoviesWithReviews: FC = () => {

    const [showMovieReviewsDialog, setShowMovieReviewsDialog] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);

    let [selectedMovieReviews, setSelectedMovieReviews] = useState<any>([]);
    let [selectedMovieName, setSelectedMovieName] = useState<any>([]);

    useEffect(() => {
        axios.get("http://localhost:8080/movie/list").then(response => {
            setMovies(response.data);
        })
    }, []);

    function openMovieReviewsDialog(id: number, name: string) {
        axios.get(`http://localhost:8080/movie/${id}/reviews`).then(response => {
            setSelectedMovieReviews(response.data);
            setSelectedMovieName(name);
            setShowMovieReviewsDialog(true);
        })
    }

    return (
        <>
            <MovieReviewsDialogContext.Provider value={{
                showMovieReviewsDialog,
                setShowMovieReviewsDialog,
                selectedMovieReviews,
                selectedMovieName
            }}>
                <MovieReviewsDialog/>
                {movies.length === 0 &&
                    <div className="text-center alert alert-danger">
                        We don't have any movies here, yet!
                    </div>
                }
                {movies.length !== 0 &&
                    <div>
                        {movies.map((movie: any) => (
                            <div className="mt-3 mb-3 card" key={movie.id}>
                                <div className="row no-gutters">
                                    <div className="col-md-4">
                                        <img src={movie.bannerLink} className="card-img" alt="..."/>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{movie.name}
                                                <a id="reviews" className="btn btn-primary"
                                                   onClick={() => openMovieReviewsDialog(movie.id, movie.name)}>Reviews</a>
                                            </h5>
                                            <p className="card-text">{movie.year}, {movie.runningTime} min</p>
                                            <p className="card-text">
                                                {movie.genres.map((genre: any) => (
                                                    <span className="pe-2" key={genre.id}>|{genre.name}|</span>
                                                ))}
                                            </p>
                                            <p className="card-text">{movie.about}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </MovieReviewsDialogContext.Provider>
        </>
    )
}
