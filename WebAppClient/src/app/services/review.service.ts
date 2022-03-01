import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Review} from "../models/review";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token-storage.service";

const API_URL = 'http://localhost:8080/review/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})
export class ReviewService {

  constructor(private http: HttpClient, private token: TokenStorageService) {
  }

  // @ts-ignore
  public saveReview(review): Observable<any> {
    let currentUser = this.token.getUser();
    return this.http.post<Review>(API_URL + 'create/angular', {
      userId: currentUser.id,
      movieId: review.movieId,
      text: review.text
    }, httpOptions);
  }

}
