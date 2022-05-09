import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {CreateGenreRequest} from "../../models/requests/create-genre-request";
import {GenreService} from "../../services/genre.service";
import {HttpErrorResponse} from '@angular/common/http';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-genre-dialog',
  templateUrl: './create-genre-dialog.component.html',
  styleUrls: ['./create-genre-dialog.component.css']
})
export class CreateGenreDialogComponent implements OnInit {

  public createGenreForm: FormGroup;

  constructor(private genreService: GenreService, private dialogRef: MatDialogRef<CreateGenreDialogComponent>) {

    this.createGenreForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern('^[^\\s]+[a-zA-Z]+(\\s+[^\\s]+[a-zA-Z])*$')]),
    })
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  public async createGenre(): Promise<void> {
    const createGenreRequest: CreateGenreRequest = {
      name: this.name.value
    };

    try {
      await this.genreService.saveGenre(createGenreRequest);
      await Swal.fire({
        titleText: 'Genre was successfully created',
        icon: 'success',
        confirmButtonText: 'Close'
      });
      this.closeDialog();

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

  get name(): FormControl {
    return <FormControl>this.createGenreForm.get('name');
  }
}
