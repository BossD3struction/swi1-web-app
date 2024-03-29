import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Review} from 'src/app/models/review';
import {MovieService} from 'src/app/services/movie.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  content!: string;
  id: any;
  reviews: Review[] = [];
  timeoutInMillis: number = 86400000;    // 24 hours

  constructor(private movieService: MovieService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.movieService.listMovieReviews(this.id).subscribe(
      data => {
        this.reviews = data;
      }, err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    setTimeout(() => {
      this.ngOnInit()
    }, this.timeoutInMillis);
  }

}
