import {Injectable} from '@angular/core';
import {User} from "../models/user";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({providedIn: 'root'})
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

  public isUserLoggedIn(): boolean {
    return sessionStorage.getItem(TOKEN_KEY) !== null;
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    // @ts-ignore
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

}
