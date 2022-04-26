import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GenreService} from "../../services/genre.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {UpdateGenreRequest} from "../../models/requests/update-genre-request";
import {Genre} from "../../models/genre";

@Component({
  selector: 'app-update-genre-dialog',
  templateUrl: './update-genre-dialog.component.html',
  styleUrls: ['./update-genre-dialog.component.css']
})
export class UpdateGenreDialogComponent implements OnInit {

  public updateGenreForm: FormGroup;
  public selectedGenre!: Genre;

  constructor(private genreService: GenreService, private dialogRef: MatDialogRef<UpdateGenreDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.updateGenreForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+[a-zA-Z]+(\\s+[^\\s]+[a-zA-Z])*$')]),
    })
  }

  ngOnInit(): void {
    this.selectedGenre = this.data.allGenres.find((item: Genre) => item.id === this.data.genreId);
    this.name.setValue(this.selectedGenre.name);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  public async updateGenreRequest(result: any): Promise<void> {
    if (result.isConfirmed) {
      const updateGenreRequest: UpdateGenreRequest = {
        name: this.name.value
      };

      try {
        await this.genreService.updateGenre(this.data.genreId, updateGenreRequest);
        await Swal.fire({
          titleText: 'Genre was successfully updated',
          icon: 'success',
          confirmButtonText: 'Close'
        });
        await this.closeDialog();

      } catch (err) {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            await Swal.fire({
              titleText: 'Genre with this name is already in database!',
              icon: 'error',
              confirmButtonText: 'Close'
            });
          }
        }
      }
    }
  }

  public async updateGenre() {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then((result) => {
        this.updateGenreRequest(result);
      })
    } catch (err: any) {
      console.log(err);
    }
  }

  get name(): FormControl {
    return <FormControl>this.updateGenreForm.get('name');
  }

}
