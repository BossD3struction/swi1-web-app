import {Component, OnInit} from '@angular/core';
import {Genre} from 'src/app/models/genre';
import {TokenStorageService} from "../../services/token-storage.service";
import {GenreService} from "../../services/genre.service";
import {CreateGenreDialogComponent} from "../../dialogs/create-genre-dialog/create-genre-dialog.component";
import {MatDialog} from '@angular/material/dialog';
import Swal from "sweetalert2";
import {UpdateGenreDialogComponent} from "../../dialogs/update-genre-dialog/update-genre-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  content!: string;
  currentUser: any;

  genres: Genre[] = []

  constructor(private genreService: GenreService, private token: TokenStorageService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if (this.currentUser != null && this.currentUser.roles == 'ROLE_ADMIN') {
      this.genreService.listGenres().subscribe(
        data => {
          this.genres = data;
        }, err => {
          this.content = JSON.parse(err.error).message;
        }
      );
    }
  }

  openCreateGenreDialog() {
    let dialog = this.dialog.open(CreateGenreDialogComponent, {
      width: '450px',
      height: '280px',
      disableClose: true,
    });
    dialog.afterClosed().subscribe(
      async () => {
        this.genreService.listGenres().subscribe(
          data => {
            this.genres = data;
          }, err => {
            this.content = JSON.parse(err.error).message;
          }
        );
      }
    )
  }

  openUpdateGenreDialog(id: number) {
    let dialog = this.dialog.open(UpdateGenreDialogComponent, {
      data: {genreId: id, allGenres: this.genres},
      width: '450px',
      height: '280px',
      disableClose: true,
    });
    dialog.afterClosed().subscribe(
      async () => {
        this.genreService.listGenres().subscribe(
          data => {
            this.genres = data;
          }, err => {
            this.content = JSON.parse(err.error).message;
          }
        );
      }
    )
  }

  public async deleteGenreRequest(result: any, id: number) {
    if (result.isConfirmed) {
      try {
        await this.genreService.deleteGenre(id);
        await Swal.fire({
          titleText: 'Genre was successfully deleted',
          icon: 'success',
          confirmButtonText: 'Close'
        });
        this.genreService.listGenres().subscribe(
          data => {
            this.genres = data;
          }, err => {
            this.content = JSON.parse(err.error).message;
          }
        );
      } catch (err) {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 500) {
            await Swal.fire({
              titleText: 'Can\'t delete genre that is assigned to a movie',
              icon: 'error',
              confirmButtonText: 'Close'
            });
          }
        }
      }
    }
  }

  public async deleteGenre(id: number) {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        this.deleteGenreRequest(result, id);
      })
    } catch (err: any) {
      console.log(err);
    }
  }
}
