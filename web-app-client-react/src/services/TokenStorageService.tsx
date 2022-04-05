import LoginResponse from "../models/response/LoginResponse";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

export class TokenStorageService {

    constructor() {
    }

    signOut(): void {
        window.sessionStorage.clear();
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string | null {
        return sessionStorage.getItem(TOKEN_KEY);
    }

    public login(loginResponse: LoginResponse): void {
        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(loginResponse));
    }

    public getUser(): string {
        return JSON.parse(sessionStorage.getItem(USER_KEY) || '');
    }
}
