import LoginRequest from "../models/request/LoginRequest";
import LoginResponse from "../models/response/LoginResponse";
import RegisterRequest from "../models/request/RegisterRequest";
import RegisterResponse from "../models/response/RegisterResponse";

export class AuthService {

    private url = "http://localhost:8080/auth/";

    public async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        if (loginRequest === null || loginRequest === undefined)
            throw new Error('The loginRequest cannot be null.');

        const response = await fetch(this.url + "login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginRequest)
        })

        if (!response.ok) {
            throw response;
        }

        return await response.json();
    }

    public async register(registerRequest: RegisterRequest): Promise<RegisterResponse> {
        if (registerRequest === null || registerRequest === undefined)
            throw new Error('The registerRequest cannot be null.');

        const response = await fetch(this.url + "register", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(registerRequest)
        })

        if (!response.ok) {
            throw response;
        }

        return await response.json();
    }
}
