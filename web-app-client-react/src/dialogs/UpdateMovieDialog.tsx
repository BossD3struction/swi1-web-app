import React, {FC, useContext, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {UpdateMovieDialogContext} from "../contexts/UpdateMovieDialogContext";
import TextField from "@mui/material/TextField";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Stack} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import UpdateMovieRequest from "../models/request/UpdateMovieRequest";

export const UpdateMovieDialog: FC = () => {

    const {
        showUpdateMovieDialog,
        setShowUpdateMovieDialog,
        genresFromDatabase,
        isUserLoggedIn
    }: any = useContext(UpdateMovieDialogContext);

    let {selectedMovie, checkedGenresFromDatabase}: any = useContext(UpdateMovieDialogContext);

    const [validName, setValidName] = useState<any>(true);
    const [validYear, setValidYear] = useState<any>(true);
    const [validRunningTime, setValidRunningTime] = useState<any>(true);
    const [validBannerLink, setValidBannerLink] = useState<any>(true);
    const [validAbout, setValidAbout] = useState<any>(true);
    const [symbolsArr] = useState(["e", "E", "+", "-", "."]);

    const handleNameValidation = (e: any) => {
        const reg = new RegExp("^[^\\s]+(\\s+[^\\s]+)*$");
        setValidName(reg.test(e.target.value));
        selectedMovie.name = e.target.value;
    };

    const handleYearValidation = (e: any) => {
        if (e.target.value < 1900 || e.target.value > 2099) {
            setValidYear(false);
            selectedMovie.year = e.target.value;
        } else {
            setValidYear(true);
            selectedMovie.year = e.target.value;
        }
    }

    const handleRunningTimeValidation = (e: any) => {
        if (e.target.value.length !== 0) {
            if (e.target.value.length <= 3) {
                selectedMovie.runningTime = e.target.value;
            } else {
                e.target.value = selectedMovie.runningTime;
            }
            setValidRunningTime(true);
            if (e.target.value[0] == 0) {
                setValidRunningTime(false);
            }
        } else {
            setValidRunningTime(false);
        }
    }

    const handleBannerLinkValidation = (e: any) => {
        const reg = new RegExp("^[^\\s]+(\\s+[^\\s]+)*$");
        setValidBannerLink(reg.test(e.target.value));
        selectedMovie.bannerLink = e.target.value;
    };

    const handleAboutValidation = (e: any) => {
        const reg = new RegExp("^[^\\s]+(\\s+[^\\s]+)*$");
        setValidAbout(reg.test(e.target.value));
        selectedMovie.about = e.target.value;
    };

    const handleClose = () => {
        setShowUpdateMovieDialog(false);
        setValidName(true);
        setValidYear(true);
        setValidRunningTime(true);
        setValidBannerLink(true);
        setValidAbout(true);
    };

    const handleCheckboxChange = (event: any) => {
        let checkedGenreId = parseInt(event.target.value);
        let checkedGenres = [...selectedMovie.genresId, checkedGenreId];
        if (selectedMovie.genresId.includes(checkedGenreId)) {
            checkedGenres = checkedGenres.filter((id: number) => id !== checkedGenreId);
        }
        selectedMovie.genresId = checkedGenres;
    };

    function updateMovieRequest(result: any) {
        if (result.isConfirmed) {
            axios.defaults.headers.common = {'Authorization': `Bearer ${isUserLoggedIn}`}
            let updateMovieRequest: UpdateMovieRequest = {
                id: selectedMovie.id,
                name: selectedMovie.name,
                year: selectedMovie.year,
                runningTime: selectedMovie.runningTime,
                bannerLink: selectedMovie.bannerLink,
                about: selectedMovie.about,
                genresId: selectedMovie.genresId
            }
            axios.put(`http://localhost:8080/movie/update`, updateMovieRequest).then(async response => {
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
                if (error.toJSON().status === 400) {
                    await Swal.fire({
                        titleText: 'Movie with this name is already in database!',
                        icon: 'error',
                        width: 'auto',
                        confirmButtonText: 'Close'
                    });
                }
            });
        }
    }

    async function updateMovie(e: any) {
        try {
            // this prevents page reload on form submit
            e.preventDefault();
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update it!'
            }).then((result) => {
                updateMovieRequest(result);
            })
        } catch (err: any) {
            console.log(err);
        }
    }

    function isDisabledChecker() {
        return !validName || !validYear || !validRunningTime || !validBannerLink || !validAbout;
    }

    return (
        <>
            <Modal show={showUpdateMovieDialog} onHide={handleClose} dialogClassName="modal-50w" backdrop="static"
                   keyboard={false}>
                <form onSubmit={updateMovie} autoComplete="off">
                    <Modal.Header closeButton>
                        <Modal.Title>Movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row justify-content-center mb-4">
                            <Stack spacing={3}>
                                <TextField
                                    InputLabelProps={{required: false}}
                                    required
                                    error={!validName}
                                    helperText={!validName ? "String is empty or whitespaces detected at the beginning/end of the text" : ''}
                                    id="name-input"
                                    label="Name"
                                    variant="outlined"
                                    type="text"
                                    defaultValue={selectedMovie.name}
                                    onChange={(e) => handleNameValidation(e)}
                                />
                            </Stack>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <Stack spacing={3}>
                                <TextField
                                    InputLabelProps={{required: false}}
                                    required
                                    error={!validYear}
                                    helperText={!validYear ? "Year is not in range 1900 - 2099" : ''}
                                    id="year-input"
                                    label="Year"
                                    variant="outlined"
                                    type="number"
                                    defaultValue={selectedMovie.year}
                                    onChange={(e) => handleYearValidation(e)}
                                    onKeyDown={e => symbolsArr.includes(e.key) && e.preventDefault()}
                                />
                            </Stack>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <Stack spacing={3}>
                                <TextField
                                    InputLabelProps={{required: false}}
                                    required
                                    error={!validRunningTime}
                                    helperText={!validRunningTime ? "Running time is empty or begins with number 0" : ''}
                                    id="running-time-input"
                                    label="Running Time"
                                    variant="outlined"
                                    type="number"
                                    defaultValue={selectedMovie.runningTime}
                                    onChange={(e) => handleRunningTimeValidation(e)}
                                    onKeyDown={e => symbolsArr.includes(e.key) && e.preventDefault()}
                                />
                            </Stack>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <Stack spacing={3}>
                                <TextField
                                    InputLabelProps={{required: false}}
                                    required
                                    error={!validBannerLink}
                                    helperText={!validBannerLink ? "String is empty or whitespaces detected at the beginning/end of the text" : ''}
                                    id="banner-link-input"
                                    label="Banner Link"
                                    variant="outlined"
                                    placeholder="http://localhost:8080/images/"
                                    type="string"
                                    defaultValue={selectedMovie.bannerLink}
                                    onChange={(e) => handleBannerLinkValidation(e)}
                                />
                            </Stack>
                        </div>
                        <div className="row justify-content-center">
                            <Stack spacing={3}>
                                <TextField
                                    InputLabelProps={{required: false}}
                                    required
                                    error={!validAbout}
                                    helperText={!validAbout ? "String is empty or whitespaces detected at the beginning/end of the text" : ''}
                                    id="about-input"
                                    label="About"
                                    type="string"
                                    multiline
                                    defaultValue={selectedMovie.about}
                                    onChange={(e) => handleAboutValidation(e)}
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary" disabled={isDisabledChecker()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}
