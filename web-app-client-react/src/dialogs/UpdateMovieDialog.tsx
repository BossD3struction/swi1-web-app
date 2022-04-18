import React, {FC, useContext} from "react";
import {Button, Modal} from "react-bootstrap";
import {UpdateMovieDialogContext} from "../contexts/UpdateMovieDialogContext";
import TextField from "@mui/material/TextField";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Stack} from "@mui/material";

export const UpdateMovieDialog: FC = () => {

    const {show, setShow}: any = useContext(UpdateMovieDialogContext);
    let {selectedMovie, checkedGenresFromDatabase}: any = useContext(UpdateMovieDialogContext);
    const {genresFromDatabase}: any = useContext(UpdateMovieDialogContext);
    const handleClose = () => {
        setShow(false)
        /*setSelectedMovie([]);
        setCheckedGenres([]);*/
    };

    const handleCheckboxChange = (event: any) => {
        let checkedGenreId = parseInt(event.target.value);
        let checkedGenres = [...selectedMovie.genresId, checkedGenreId];
        if (selectedMovie.genresId.includes(checkedGenreId)) {
            checkedGenres = checkedGenres.filter((id: number) => id !== checkedGenreId);
        }
        selectedMovie.genresId = checkedGenres;
    };

    const consoleInfo = () => {
        console.log("selectedMovie.genresId: " + selectedMovie.genresId);
        console.log("checkedGenres: " + checkedGenresFromDatabase);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} dialogClassName="modal-50w" backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row justify-content-center mb-4">
                            <Stack spacing={3}>
                                <TextField InputLabelProps={{required: false}}
                                           required
                                           id="name-input"
                                           label="Name"
                                           variant="outlined"
                                           type="text"
                                           defaultValue={selectedMovie.name}
                                           onChange={(event) => {
                                               selectedMovie.name = (event.target.value);
                                           }}
                                />
                            </Stack>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <Stack spacing={3}>
                                <TextField InputLabelProps={{required: false}}
                                           required
                                           id="year-input"
                                           label="Year"
                                           variant="outlined"
                                           type="number"
                                           defaultValue={selectedMovie.year}
                                           onChange={(event) => {
                                               selectedMovie.year = (event.target.value);
                                           }}
                                />
                            </Stack>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <Stack spacing={3}>
                                <TextField InputLabelProps={{required: false}}
                                           required
                                           id="running-time-input"
                                           label="Running Time"
                                           variant="outlined"
                                           type="number"
                                           defaultValue={selectedMovie.runningTime}
                                           onChange={(event) => {
                                               selectedMovie.runningTime = (event.target.value);
                                           }}
                                />
                            </Stack>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <Stack spacing={3}>
                                <TextField InputLabelProps={{required: false}}
                                           required
                                           id="banner-link-input"
                                           label="Banner Link"
                                           variant="outlined"
                                           type="string"
                                           defaultValue={selectedMovie.bannerLink}
                                           onChange={(event) => {
                                               selectedMovie.bannerLink = (event.target.value);
                                           }}
                                />
                            </Stack>
                        </div>
                        <div className="row justify-content-center">
                            <Stack spacing={3}>
                                <TextField
                                    id="about-input"
                                    label="About"
                                    multiline
                                    defaultValue={selectedMovie.about}
                                    onChange={(event) => {
                                        selectedMovie.about = (event.target.value);
                                    }}
                                />
                            </Stack>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <Stack spacing={3}>
                                <FormControl sx={{m: 3}} component="fieldset" variant="standard">
                                    <FormLabel component="legend">Genres</FormLabel>
                                    <FormGroup>
                                        {genresFromDatabase.map((genre: any) => (
                                            <FormControlLabel
                                                key={genre.name}
                                                control={
                                                    <Checkbox
                                                        key={genre.name}
                                                        defaultChecked={checkedGenresFromDatabase.includes(genre.id)}
                                                        id={genre.toString().id}
                                                        name={genre.name}
                                                        value={genre.id}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                }
                                                label={genre.name}
                                            />
                                        ))}
                                    </FormGroup>
                                </FormControl>
                            </Stack>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                    <Button variant="success" onClick={consoleInfo}>
                        Console log
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
