import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GenreService} from "../../services/genre.service";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";
import {UpdateGenreRequest} from "../../models/requests/update-genre-request";

@Component({
  selector: 'app-update-genre-dialog',
  templateUrl: './update-genre-dialog.component.html',
  styleUrls: ['./update-genre-dialog.component.css']
})
export class UpdateGenreDialogComponent implements OnInit {

  content!: string;
  public updateGenreForm: FormGroup;

  constructor(private genreService: GenreService, private dialogRef: MatDialogRef<UpdateGenreDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.updateGenreForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.genreService.getGenreById(this.data.genreId).subscribe(
      data => {
        this.name.setValue(data.name);
      }, err => {
        this.content = JSON.parse(err.error).message;
      }
    );
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
              titleText: 'Genre is already in database!',
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
