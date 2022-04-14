import React, {FC, useContext, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {UpdateMovieDialogContext} from "../contexts/UpdateMovieDialogContext";
import TextField from "@mui/material/TextField";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Stack} from "@mui/material";

export const UpdateMovieDialog: FC = () => {

    const {show, setShow}: any = useContext(UpdateMovieDialogContext);
    let {selectedMovie, setSelectedMovie}: any = useContext(UpdateMovieDialogContext);
    const {genresFromDatabase}: any = useContext(UpdateMovieDialogContext);
    const handleClose = () => {
        setShow(false)
        setSelectedMovie([]);
    };

    /*const url = 'http://localhost:8080/genre/list';
    const [databaseGenres, setDatabaseGenres] = useState<any>([]);
    const [genres, setGenres] = useState<any>([]);*/

    /*const [name, setName] = useState<any>([]);
    const [year, setYear] = useState<any>([]);
    const [runningTime, setRunningTime] = useState<any>([]);
    const [bannerLink, setBannerLink] = useState<any>([]);
    const [about, setAbout] = useState<any>([]);*/

    /*const toggleHandler = (genre: any) => () => {
        setGenres((state: any) => ({
            ...state,
            [genre.id]: state[genre.id] ? null : {
                id: genre.id,
                name: genre.name
            }
        }))
    }*/

    const handleCheckboxChange = (event: any) => {
        let checkedGenreId = parseInt(event.target.value);
        /*console.log(event.target.value);
        console.log(parseInt(event.target.value));
        console.log("checkedGenreId: " + checkedGenreId);*/
        let checkedGenres = [...selectedMovie.genresId, checkedGenreId];
        if (selectedMovie.genresId.includes(checkedGenreId)) {
            checkedGenres = checkedGenres.filter((id) => id !== checkedGenreId);
        }
        selectedMovie.genresId = checkedGenres;
    };

    const [checked, setChecked] = useState(false)
    const handleClick = () => setChecked(!checked)

    /*let sum = (x: number, y: number): number => {
        return x + y;
    }
*/
    /*const handleCheckboxChange = (event: any) => () => {
        let checkedGenreId = parseInt(event.target.id, 10);
        let checkedGenres = [...genres, checkedGenreId];
        if (genres.includes(checkedGenreId)) {
            checkedGenres = checkedGenres.filter((id) => id !== checkedGenreId);
        }
        setGenres(checkedGenres);
    };*/

    const consoleInfo = () => {
        console.log(selectedMovie);
        /*console.log(selectedMovie.name);
        console.log(selectedMovie.year);
        console.log(selectedMovie.runningTime);
        console.log(selectedMovie.bannerLink);
        console.log(selectedMovie.about);*/
        console.log("genres: " + selectedMovie.genresId);
        console.log("-------");
        /*console.log(genres);
        console.log(selectedMovie.genres);*/
    }

    /*useEffect(() => {
        axios.get(url).then(response => {
            setDatabaseGenres(response.data);
            //setGenres(selectedMovie.genresId);
        })
    }, [url/!*, selectedMovie*!/]);*/

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
                                                        //checked={e.target.checked}
                                                        id={genre.toString().id}
                                                        name={genre.name}
                                                        value={genre.id}
                                                        onClick={handleClick}
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
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                    <Button variant="primary" onClick={consoleInfo}>
                        Console log
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
