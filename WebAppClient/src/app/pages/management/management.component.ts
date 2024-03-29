import {Component, OnInit} from '@angular/core';
import {Genre} from 'src/app/models/genre';
import {Movie} from 'src/app/models/movie';
import {GenreService} from 'src/app/services/genre.service';
import {MovieService} from 'src/app/services/movie.service';
import {TokenStorageService} from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  content!: string;
  text!: string;
  currentUser: any;
  movies: Movie[] = [];
  genres: Genre[] = [];
  form: any = {};
  isSuccessful = false;
  isAddMovieFailed = false;
  errorMessage = '';
  genresFormArray: Array<any> = [];

  constructor(private token: TokenStorageService, private movieService: MovieService, private genreService: GenreService) {
  }

  onChange(id: number, isChecked: boolean) {
    if (isChecked) {
      this.genresFormArray.push(id);
    } else {
      let index = this.genresFormArray.indexOf(id);
      this.genresFormArray.splice(index, 1);
    }
  }

  ngOnInit(): void {
    this.form.bannerLink = "http://localhost:8080/images/";
    this.currentUser = this.token.getUser();
    this.genreService.listGenres().subscribe(
      data => {
        this.genres = data;
      }, err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  onSubmit(): void {
    this.movieService.saveMovie(this.form, this.genresFormArray).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isAddMovieFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isAddMovieFailed = true;
      }
    );
  }

  checkYearNumberSize(year: number) {
    if (year === 0) {
      this.form.year = 1;
    }
    if (year > 9999) {
      this.form.year = 2022;
    }
  }

  checkRunningTimeNumberSize(runningTime: number) {
    if (runningTime === 0) {
      this.form.runningTime = 1;
    }
    if (runningTime > 999) {
      this.form.runningTime = 100;
    }
  }

  preventUnwantedInput(e: any) {
    let symbols = ["e", "E", "+", "-", "."];
    (symbols.includes(e.key) && e.preventDefault())
  }
}
