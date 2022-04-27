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

    const [validName, setValidName] = useState<any>(true);
    const [validRunningTime, setValidRunningTime] = useState<any>(true);
    const [validBannerLink, setValidBannerLink] = useState<any>(true);
    const [validAbout, setValidAbout] = useState<any>(true);
    const [symbolsArr] = useState(["e", "E", "+", "-", "."]);

    const handleNameValidation = (e: any) => {
        const reg = new RegExp("^[^\\s]+(\\s+[^\\s]+)*$");
        setValidName(reg.test(e.target.value));
        setName(e.target.value);
    };

    const handleRunningTimeValidation = (e: any) => {
        if (e.target.value.length !== 0) {
            if (e.target.value.length <= 3) {
                setRunningTime(e.target.value);
            } else {
                e.target.value = runningTime;
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
        setBannerLink(e.target.value);
    };

    const handleAboutValidation = (e: any) => {
        const reg = new RegExp("^[^\\s]+(\\s+[^\\s]+)*$");
        setValidAbout(reg.test(e.target.value));
        setAbout(e.target.value);
    };

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

    function isDisabledChecker() {
        return !validName || !validRunningTime || !validBannerLink || !validAbout;
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
                                           error={!validName}
                                           helperText={!validName ? "String is empty or whitespaces detected at the beginning/end of the text" : ''}
                                           id="name-input"
                                           label="Name"
                                           variant="outlined"
                                           type="text"
                                           onChange={(e) => handleNameValidation(e)}
                                />
                            </Stack>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            views={['year']}
                                            label="Year"
                                            value={datePickerYearValue}
                                            onChange={(newValue) => {
                                                setDatePickerYearValue(newValue);
                                                if (newValue != null) {
                                                    if (newValue.getFullYear() != 0)
                                                        setYear(newValue.getFullYear());
                                                } else {
                                                    newValue = new Date();
                                                    setDatePickerYearValue(newValue);
                                                    setYear(new Date().getFullYear());
                                                }
                                            }}
                                            renderInput={(params) => <TextField {...params} helperText={null}/>}
                                        />
                                    </LocalizationProvider>

                                </Stack>
                            </LocalizationProvider>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <Stack spacing={3}>
                                <TextField InputLabelProps={{required: false}}
                                           required
                                           error={!validRunningTime}
                                           helperText={!validRunningTime ? "Running time is empty or begins with number 0" : ''}
                                           id="running-time-input"
                                           label="Running Time"
                                           variant="outlined"
                                           type="number"
                                           onChange={(e) => handleRunningTimeValidation(e)}
                                           onKeyDown={e => symbolsArr.includes(e.key) && e.preventDefault()}
                                />
                            </Stack>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <Stack spacing={3}>
                                <TextField InputLabelProps={{required: false}}
                                           required
                                           error={!validBannerLink}
                                           helperText={!validBannerLink ? "String is empty or whitespaces detected at the beginning/end of the text" : ''}
                                           id="banner-link-input"
                                           label="Banner Link"
                                           variant="outlined"
                                           type="string"
                                           onChange={(e) => handleBannerLinkValidation(e)}
                                />
                            </Stack>
                        </div>
                        <div className="row justify-content-center">
                            <Stack spacing={3}>
                                <TextField InputLabelProps={{required: false}}
                                           required
                                           error={!validAbout}
                                           helperText={!validAbout ? "String is empty or whitespaces detected at the beginning/end of the text" : ''}
                                           id="about-input"
                                           label="About"
                                           multiline
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
                        <Button type="submit" variant="success" disabled={isDisabledChecker()}>
                            Create
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}
