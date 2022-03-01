import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isRegisterFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isRegisterFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isRegisterFailed = true;
      }
    );
  }

}
