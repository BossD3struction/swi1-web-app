import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Genre} from "../models/genre";
import {CreateGenreRequest} from "../models/requests/create-genre-request";
import {UpdateGenreRequest} from "../models/requests/update-genre-request";

const API_URL = 'http://localhost:8080/genre/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class GenreService {

  constructor(private http: HttpClient) {
  }

  public listGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(API_URL + 'list');
  }

  public saveGenre(genre: CreateGenreRequest): Promise<any> {
    return this.http.post(API_URL + 'create', {
      name: genre.name
    }, httpOptions).toPromise();
  }

  public deleteGenre(id: number): Promise<any> {
    return this.http.delete(API_URL + id + '/delete', httpOptions).toPromise();
  }

  public updateGenre(id: number, genre: UpdateGenreRequest): Promise<any> {
    return this.http.put(API_URL + id + '/update', {
      name: genre.name
    }, httpOptions).toPromise();
  }

  public getGenreById(id: number): Observable<Genre> {
    return this.http.get<Genre>(API_URL + id);
  }

}
