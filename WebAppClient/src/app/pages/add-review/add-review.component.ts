import {Component, OnInit} from '@angular/core';
import {Movie} from 'src/app/models/movie';
import {MovieService} from 'src/app/services/movie.service';
import {ReviewService} from 'src/app/services/review.service';
import {TokenStorageService} from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  content!: string;
  text!: string;
  currentUser: any;
  movies: Movie[] = [];
  form: any = {};
  isSuccessful = false;
  isAddReviewFailed = false;
  errorMessage = '';

  constructor(private token: TokenStorageService, private reviewService: ReviewService, private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.movieService.listMovies().subscribe(
      data => {
        this.movies = data;
        this.form.movieId = data[0].id;
      }, err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  onSubmit(): void {
    this.reviewService.saveReview(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isAddReviewFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isAddReviewFailed = true;
      }
    );
  }

}
