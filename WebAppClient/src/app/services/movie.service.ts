import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from "../models/movie";
import {Review} from "../models/review";

const API_URL = 'http://localhost:8080/movie/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class MovieService {

  constructor(private http: HttpClient) {
  }

  public listMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(API_URL + 'list');
  }

  public listMovieReviews(id: string): Observable<Review[]> {
    return this.http.get<Review[]>(API_URL + id + '/reviews');
  }

  public saveMovie(movie: any, genresFormArray: Array<any>): Observable<any> {
    return this.http.post<Movie>(API_URL + 'create/angular', {
      name: movie.name,
      year: movie.year,
      runningTime: movie.runningTime,
      bannerLink: movie.bannerLink,
      about: movie.about,
      genresId: genresFormArray
    }, httpOptions);
  }

}
