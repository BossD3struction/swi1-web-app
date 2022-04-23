import LoginResponse from "../models/response/LoginResponse";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

export class TokenStorageService {

    signOut(): void {
        window.localStorage.clear();
    }

    public saveToken(token: string): void {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    }

    public login(loginResponse: LoginResponse): void {
        window.localStorage.removeItem(USER_KEY);
        window.localStorage.setItem(USER_KEY, JSON.stringify(loginResponse));
    }

    public getUser(): string {
        return JSON.parse(localStorage.getItem(USER_KEY) || '');
    }

    public getUserOptimized(): LoginResponse {
        return JSON.parse(localStorage.getItem(USER_KEY) || '');
    }
}
