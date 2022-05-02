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
    const navigate = useNavigate();

    const [username, setUsername] = useState<any>([]);
    const [email, setEmail] = useState<any>([]);
    const [password, setPassword] = useState<any>([]);
    const [validUsername, setValidUsername] = useState<any>(true);
    const [validEmail, setValidEmail] = useState<any>(true);
    const [validPassword, setValidPassword] = useState<any>(true);

    useEffect(() => {
        if (isUserLoggedIn !== null) {
            navigate('/home');
        }
    }, [isUserLoggedIn, navigate]);

    const handleUsernameValidation = (e: any) => {
        const reg = new RegExp("^[^\\s]+(\\s+[^\\s]+)*$");
        setValidUsername(reg.test(e.target.value));
        setUsername(e.target.value);
    };

    const handleEmailValidation = (e: any) => {
        const reg = new RegExp("^[a-zA-Z\\d.-_]+@[a-zA-Z.-]{2,}[.][a-zA-Z]{2,}$");
        setValidEmail(reg.test(e.target.value));
        setEmail(e.target.value);
        console.log(email);
        console.log(validEmail);
    };

    const handlePasswordValidation = (e: any) => {
        const reg = new RegExp("^[^\\s]+(\\s+[^\\s]+)*$");
        setValidPassword(reg.test(e.target.value));
        setPassword(e.target.value);
    };

    async function registerRequest(e: any) {

        let registerRequest: RegisterRequest = {
            username: username,
            email: email.trim(),
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

    function isDisabledChecker() {
        return (!validUsername || username.length < 3) || !validEmail || (!validPassword || password.length < 6);
    }

    return (
        <form onSubmit={registerRequest} autoComplete="off">
            <div className="row justify-content-center mb-4">
                <FormControl sx={{m: 1, width: '65ch'}} variant="outlined">
                    <TextField InputLabelProps={{required: false}}
                               required
                               error={(username.length < 3 && username.length !== 0) || (!validUsername && username.length !== 0)}
                               helperText={
                                   username.length < 3 && username.length !== 0 ? "Username must be at least 3 characters long." :
                                       !validUsername && username.length !== 0 ? "Whitespaces detected at the beginning/end of the text" : ''}
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
                    <TextField InputLabelProps={{required: false}}
                               required
                               error={email.length !== 0 && !validEmail}
                               helperText={email.length !== 0 && !validEmail ? "Email pattern: joe@gmail.com" : ''}
                               id="email-input"
                               label="Email"
                               variant="outlined"
                               type="text"
                               onChange={(e) => handleEmailValidation(e)}
                    />
                </FormControl>
            </div>
            <div className="row justify-content-center mb-4">
                <FormControl sx={{m: 1, width: '65ch'}} variant="outlined">
                    <TextField InputLabelProps={{required: false}}
                               required
                               error={(password.length < 6 && password.length !== 0) || (!validPassword && password.length !== 0)}
                               helperText={
                                   password.length < 6 && password.length !== 0 ? "Password must be at least 6 characters long." :
                                       !validPassword && password.length !== 0 ? "Whitespaces detected at the beginning/end of the text" : ''}
                               id="password-input"
                               label="Password"
                               variant="outlined"
                               type="password"
                               onChange={(e) => handlePasswordValidation(e)}
                    />
                </FormControl>
            </div>
            <div className="row justify-content-center">
                <FormControl sx={{m: 1, width: '45ch'}} variant="outlined">
                    <Button type="submit" variant="contained" size="large" color="success"
                            disabled={isDisabledChecker()}>
                        Register
                    </Button>
                </FormControl>
            </div>
        </form>
    )
}
