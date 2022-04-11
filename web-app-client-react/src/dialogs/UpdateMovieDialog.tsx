import React, {FC, useContext, useEffect, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {UpdateMovieDialogContext} from "../contexts/UpdateMovieDialogContext";
import axios from "axios";
import TextField from "@mui/material/TextField";

export const UpdateMovieDialog: FC = () => {

    const {show, setShow}: any = useContext(UpdateMovieDialogContext);
    const {movieId}: any = useContext(UpdateMovieDialogContext);
    const handleClose = () => setShow(false);

    const url = `http://localhost:8080/movie/${movieId}`;
    const [movie, setMovie] = useState<any>([]);

    const [name, setName] = useState<any>([]);
    const [year, setYear] = useState<any>([]);
    const [runningTime, setRunningTime] = useState<any>([]);
    const [bannerLink, setBannerLink] = useState<any>([]);
    const [about, setAbout] = useState<any>([]);
    const [genres, setGenres] = useState<any>([]);

    useEffect(() => {
        console.log(url);
        axios.get(url).then(response => {
            setMovie(response.data)
        })
    }, [url]);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row justify-content-center mb-4">
                            <TextField InputLabelProps={{required: false}}
                                       required
                                       id="name-input"
                                       label="Name"
                                       variant="outlined"
                                       type="text"
                                       defaultValue={movie.name}
                                       onChange={(event) => {
                                           setName(event.target.value);
                                       }}
                            />
                        </div>
                        <div className="row justify-content-center mb-4">
                            <TextField InputLabelProps={{required: false}}
                                       required
                                       id="year-input"
                                       label="Year"
                                       variant="outlined"
                                       type="number"
                                       defaultValue={movie.year}
                                       onChange={(event) => {
                                           setYear(event.target.value);
                                       }}
                            />
                        </div>
                        <div className="row justify-content-center mb-4">
                            <TextField InputLabelProps={{required: false}}
                                       required
                                       id="running-time-input"
                                       label="Running Time"
                                       variant="outlined"
                                       type="number"
                                       defaultValue={movie.runningTime}
                                       onChange={(event) => {
                                           setRunningTime(event.target.value);
                                       }}
                            />
                        </div>
                        <div className="row justify-content-center mb-4">
                            <TextField InputLabelProps={{required: false}}
                                       required
                                       id="banner-link-input"
                                       label="Banner Link"
                                       variant="outlined"
                                       type="string"
                                       defaultValue={movie.bannerLink}
                                       onChange={(event) => {
                                           setBannerLink(event.target.value);
                                       }}
                            />
                        </div>
                        <div className="row justify-content-center">
                            <TextField InputLabelProps={{required: false}}
                                       required
                                       id="about-input"
                                       label="About"
                                       variant="outlined"
                                       type="string"
                                       defaultValue={movie.about}
                                       onChange={(event) => {
                                           setAbout(event.target.value);
                                       }}
                            />
                        </div>
                        {/*<div className="row justify-content-center mb-4">
                            <TextField InputLabelProps={{required: false}}
                                       required
                                       id="genres-input"
                                       label="Genres"
                                       variant="outlined"
                                       type="string"
                                       defaultValue={movie.genres}
                                       onChange={(event) => {
                                           setGenres(event.target.value);
                                       }}
                            />
                        </div>*/}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
