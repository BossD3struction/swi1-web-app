import React, {FC, useEffect, useState} from "react";
import {AuthService} from "../services/AuthService";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import RegisterRequest from "../models/request/RegisterRequest";
import RegisterResponse from "../models/response/RegisterResponse";
import {useNavigate} from "react-router-dom";
import {TokenStorageService} from "../services/TokenStorageService";
import {Button, FormControl} from "@mui/material";

export const Register: FC = () => {

    let authService = new AuthService();
    let tokenStorageService = new TokenStorageService();
    const isUserLoggedIn = tokenStorageService.getToken();

    const [username, setUsername] = useState<any>([]);
    const [email, setEmail] = useState<any>([]);
    const [password, setPassword] = useState<any>([]);
    const [valid, setValid] = useState<any>(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (isUserLoggedIn !== null) {
            navigate('/home');
        }
    }, [isUserLoggedIn, navigate]);

    const handleValidation = (e: any) => {
        const reg = new RegExp("[a-zA-Z0-9.-_]+@[a-zA-Z.-]{2,}[.][a-zA-Z]{2,}");
        setValid(reg.test(e.target.value));
        setEmail(e.target.value);
    };

    async function registerRequest(e: any) {

        let registerRequest: RegisterRequest = {
            username: username,
            email: email,
            password: password
        }
        try {
            // this prevents page reload on form submit
            e.preventDefault();
            let registerResponse: Promise<RegisterResponse> = authService.register(registerRequest).then();
            await registerResponse;
            await Swal.fire({
                titleText: 'Registration was successful',
                icon: 'success',
                confirmButtonText: 'Close'
            });
            navigate('/login');
        } catch (err: any) {
            if (err.status === 404) {
                await Swal.fire({
                    titleText: 'Username \'' + username + '\' is already taken!',
                    icon: 'error',
                    width: 'auto',
                    confirmButtonText: 'Close'
                });
            }
            if (err.status === 401) {
                await Swal.fire({
                    titleText: 'Email \'' + email + '\' is already in use!',
                    icon: 'error',
                    width: 'auto',
                    confirmButtonText: 'Close'
                });
            }
        }
    }

    return (
        <form onSubmit={registerRequest}>
            <div className="row justify-content-center mb-4">
                <FormControl sx={{m: 1, width: '65ch'}} variant="outlined">
                    <TextField InputLabelProps={{required: false}}
                               required
                               error={username.length < 3 && username.length !== 0}
                               helperText={username.length < 3 && username.length !== 0 ? "Username must be at least 3 characters long." : ''}
                               id="username-input"
                               label="Username"
                               variant="outlined"
                               type="text"
                               onChange={(event) => {
                                   setUsername(event.target.value);
                               }}
                    />
                </FormControl>
            </div>
            <div className="row justify-content-center mb-4">
                <FormControl sx={{m: 1, width: '65ch'}} variant="outlined">
                    <TextField InputLabelProps={{required: false}}
                               required
                               error={!valid && email.length !== 0}
                               helperText={!valid && email.length !== 0 ? "Email pattern: joe@gmail.com" : ''}
                               id="email-input"
                               label="Email"
                               variant="outlined"
                               type="text"
                               inputProps={{pattern: "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"}}
                               onChange={(e) => handleValidation(e)}
                    />
                </FormControl>
            </div>
            <div className="row justify-content-center mb-4">
                <FormControl sx={{m: 1, width: '65ch'}} variant="outlined">
                    <TextField InputLabelProps={{required: false}}
                               required
                               error={password.length < 6 && password.length !== 0}
                               helperText={password.length < 6 && password.length !== 0 ? "Password must be at least 6 characters long." : ''}
                               id="password-input"
                               label="Password"
                               variant="outlined"
                               type="password"
                               onChange={(event) => {
                                   setPassword(event.target.value);
                               }}
                    />
                </FormControl>
            </div>
            <div className="row justify-content-center">
                <FormControl sx={{m: 1, width: '45ch'}} variant="outlined">
                    <Button type="submit" variant="contained" size="large" color="success">
                        Register
                    </Button>
                </FormControl>
            </div>
        </form>
    )
}
