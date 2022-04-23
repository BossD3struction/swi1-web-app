import React, {FC, useContext, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import TextField from "@mui/material/TextField";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Stack} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import {CreateMovieDialogContext} from "../contexts/CreateMovieDialogContext";
import CreateMovieRequest from "../models/request/CreateMovieRequest";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';

export const CreateMovieDialog: FC = () => {

    const {
        showCreateMovieDialog,
        setShowCreateMovieDialog,
        genresFromDatabase,
        isUserLoggedIn
    }: any = useContext(CreateMovieDialogContext);

    const [name, setName] = useState<any>([]);
    const [year, setYear] = useState<any>(new Date().getFullYear());
    const [datePickerYearValue, setDatePickerYearValue] = useState<any>(new Date());
    const [runningTime, setRunningTime] = useState<any>([]);
    const [bannerLink, setBannerLink] = useState<any>([]);
    const [about, setAbout] = useState<any>([]);
    const [genresId, setGenresId] = useState<any>([]);

    const handleClose = () => {
        setShowCreateMovieDialog(false);
    };

    const handleCheckboxChange = (event: any) => {
        let checkedGenreId = parseInt(event.target.value);
        let checkedGenres = [...genresId, checkedGenreId];
        if (genresId.includes(checkedGenreId)) {
            checkedGenres = checkedGenres.filter((id: number) => id !== checkedGenreId);
        }
        setGenresId(checkedGenres);
    };

    function createMovieRequest(e: any) {
        // this prevents page reload on form submit
        e.preventDefault();
        axios.defaults.headers.common = {'Authorization': `Bearer ${isUserLoggedIn}`}
        let createMovieRequest: CreateMovieRequest = {
            name: name,
            year: year,
            runningTime: runningTime,
            bannerLink: bannerLink,
            about: about,
            genresId: genresId
        }
        axios.post(`http://localhost:8080/movie/create/angular`, createMovieRequest).then(async response => {
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

    return (
        <>
            <Modal show={showCreateMovieDialog} onHide={handleClose} dialogClassName="modal-50w" backdrop="static"
                   keyboard={false}>
                <form onSubmit={createMovieRequest} autoComplete="off">
                    <Modal.Header closeButton>
                        <Modal.Title>Movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row justify-content-center mb-4">
                            <Stack spacing={3}>
                                <TextField InputLabelProps={{required: false}}
                                           required
                                           id="name-input"
                                           label="Name"
                                           variant="outlined"
                                           type="text"
                                           onChange={(event) => {
                                               setName(event.target.value);
                                           }}
                                />
                            </Stack>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3}>
                                    <DatePicker
                                        views={['year']}
                                        label="Year"
                                        value={datePickerYearValue}
                                        onChange={(newValue) => {
                                            setDatePickerYearValue(newValue);
                                            setYear(newValue.getFullYear());
                                        }}
                                        renderInput={(params) => <TextField {...params} helperText={null}/>}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <Stack spacing={3}>
                                <TextField InputLabelProps={{required: false}}
                                           required
                                           id="running-time-input"
                                           label="Running Time"
                                           variant="outlined"
                                           type="number"
                                           onChange={(event) => {
                                               setRunningTime(event.target.value);
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
                                           onChange={(event) => {
                                               setBannerLink(event.target.value);
                                           }}
                                />
                            </Stack>
                        </div>
                        <div className="row justify-content-center">
                            <Stack spacing={3}>
                                <TextField InputLabelProps={{required: false}}
                                           required
                                           id="about-input"
                                           label="About"
                                           multiline
                                           onChange={(event) => {
                                               setAbout(event.target.value);
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
                        <Button type="submit" variant="success">
                            Create
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}
