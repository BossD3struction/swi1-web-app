import React, {FC, useState} from "react";
import {AuthService} from "../services/AuthService";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import RegisterRequest from "../models/request/RegisterRequest";
import RegisterResponse from "../models/response/RegisterResponse";

export const Register: FC = () => {

    const [username, setUsername] = useState<any>([]);
    const [email, setEmail] = useState<any>([]);
    const [password, setPassword] = useState<any>([]);

    let authService = new AuthService();

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
            </div>
            <div className="row justify-content-center mb-4">
                <TextField InputLabelProps={{required: false}}
                           inputProps={{pattern: "[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"}}
                           required
                           id="email-input"
                           label="Email"
                           variant="outlined"
                           type="email"
                           onChange={(event) => {
                               setEmail(event.target.value);
                           }}
                />
            </div>
            <div className="row justify-content-center mb-4">
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
            </div>
            <div className="row justify-content-center">
                <button type="submit" className="btn btn-lg btn-success w-50">
                    Register
                </button>
            </div>
        </form>
    )
}
