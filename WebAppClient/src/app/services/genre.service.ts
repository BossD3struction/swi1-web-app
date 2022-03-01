import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Genre} from "../models/genre";

const API_URL = 'http://localhost:8080/genre/';

@Injectable({providedIn: 'root'})
export class GenreService {

  constructor(private http: HttpClient) {
  }

  public listGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(API_URL + 'list');
  }

}
