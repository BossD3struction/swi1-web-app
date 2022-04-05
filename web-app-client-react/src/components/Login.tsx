import React, {FC, useState} from 'react';
import TextField from "@mui/material/TextField";
import {AuthService} from "../services/AuthService";
import LoginRequest from "../models/request/LoginRequest";
import LoginResponse from "../models/response/LoginResponse";
import {TokenStorageService} from "../services/TokenStorageService";
import Swal from 'sweetalert2';

export const Login: FC = () => {

    const [username, setUsername] = useState<any>([]);
    const [password, setPassword] = useState<any>([]);

    let authService = new AuthService();
    let tokenStorageService = new TokenStorageService();

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

    return (
        <form onSubmit={loginRequest}>
            <div className="row justify-content-center mb-4">
                <TextField InputLabelProps={{required: false}}
                           required
                           id="username-input"
                           label="Username"
                           variant="outlined"
                           type="text"
                           onChange={(event) => {
                               setUsername(event.target.value);
                           }}
                />
            </div>
            <div className="row justify-content-center mb-4">
                <TextField InputLabelProps={{required: false}}
                           required
                           id="password-input"
                           label="Password"
                           variant="outlined"
                           type="password"
                           onChange={(event) => {
                               setPassword(event.target.value);
                           }}
                />
            </div>
            <div className="row justify-content-center">
                <button type="submit" className="btn btn-lg btn-primary w-50">
                    Login
                </button>
            </div>
        </form>
    )
}
