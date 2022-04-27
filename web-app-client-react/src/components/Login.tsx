import React, {FC, useEffect, useState} from 'react';
import TextField from "@mui/material/TextField";
import {AuthService} from "../services/AuthService";
import LoginRequest from "../models/request/LoginRequest";
import LoginResponse from "../models/response/LoginResponse";
import {TokenStorageService} from "../services/TokenStorageService";
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom";
import {Button, FormControl, IconButton, InputAdornment} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const Login: FC = () => {

    let authService = new AuthService();
    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();
    const navigate = useNavigate();

    const [username, setUsername] = useState<any>([]);
    const [password, setPassword] = useState<any>([]);
    const [showPassword, setShowPassword] = useState<any>(false);
    const [validUsername, setValidUsername] = useState<any>(true);
    const [validPassword, setValidPassword] = useState<any>(true);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleUsernameValidation = (e: any) => {
        const reg = new RegExp("^[^\\s]+(\\s+[^\\s]+)*$");
        setValidUsername(reg.test(e.target.value));
        setUsername(e.target.value);
    };

    const handlePasswordValidation = (e: any) => {
        const reg = new RegExp("^[^\\s]+(\\s+[^\\s]+)*$");
        setValidPassword(reg.test(e.target.value));
        setPassword(e.target.value);
    };

    useEffect(() => {
        if (isUserLoggedIn !== null) {
            navigate('/home');
        }
    }, [isUserLoggedIn, navigate]);

    async function loginRequest(e: any) {

        let loginRequest: LoginRequest = {
            username: username,
            password: password
        }
        try {
            // this prevents page reload on form submit
            e.preventDefault();
            let loginResponse: Promise<LoginResponse> = authService.login(loginRequest).then();
            tokenStorageService.saveToken((await loginResponse).accessToken);
            tokenStorageService.login(await loginResponse);
            await Swal.fire({
                titleText: 'Login was successful',
                icon: 'success',
                confirmButtonText: 'Close'
            });
            navigate('/home');
            window.location.reload();
        } catch (err: any) {
            if (err.status === 404) {
                await Swal.fire({
                    titleText: 'User \'' + loginRequest.username + '\' doesn\'t exist',
                    icon: 'error',
                    width: 'auto',
                    confirmButtonText: 'Close'
                });
            }
            if (err.status === 401) {
                await Swal.fire({
                    titleText: 'Incorrect password',
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            }
        }
    }

    function isDisabledChecker() {
        return (!validUsername || username.length === 0) || (!validPassword || password.length === 0);
    }

    return (
        <form onSubmit={loginRequest} autoComplete="off">
            <div className="row justify-content-center mb-4">
                <FormControl sx={{m: 1, width: '65ch'}} variant="outlined">
                    <TextField
                        InputLabelProps={{required: false}}
                        required
                        error={!validUsername && username.length !== 0}
                        helperText={!validUsername && username.length !== 0 ? "Whitespaces detected at the beginning/end of the text" : ''}
                        id="username-input"
                        label="Username"
                        variant="outlined"
                        type="text"
                        onChange={(e) => handleUsernameValidation(e)}
                    />
                </FormControl>
            </div>
            <div className="row justify-content-center mb-4">
                <FormControl sx={{m: 1, width: '65ch'}} variant="outlined">
                    <TextField
                        InputLabelProps={{required: false}}
                        required
                        error={!validPassword && password.length !== 0}
                        helperText={!validPassword && password.length !== 0 ? "Whitespaces detected at the beginning/end of the text" : ''}
                        id="password-input"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => handlePasswordValidation(e)}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        tabIndex={-1}
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                        }}
                    />
                </FormControl>
            </div>
            <div className="row justify-content-center">
                <FormControl sx={{m: 1, width: '45ch'}} variant="outlined">
                    <Button type="submit" variant="contained" size="large" disabled={isDisabledChecker()}>
                        Login
                    </Button>
                </FormControl>
            </div>
        </form>
    )
}
