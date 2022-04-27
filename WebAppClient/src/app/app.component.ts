import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./services/token-storage.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  username!: string;
  private roles!: string[];
  isLoggedIn = false;
  showManagementBoard = false;
  showAddReviewBoard = false;

  constructor(private tokenStorageService: TokenStorageService, private _snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.showAddReviewBoard = this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_USER')
      this.showManagementBoard = this.roles.includes('ROLE_ADMIN');
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    this.showAddReviewBoard = false;
    this.showManagementBoard = false;
    this.router.navigate(['/home']).then((navigated: boolean) => {
      if (navigated) {
        this._snackBar.open('You have successfully logged out', '', {
          duration: 3000,
        });
      } else {
        this._snackBar.open('You have successfully logged out', '', {
          duration: 3000,
        });
      }
    });
  }
}
