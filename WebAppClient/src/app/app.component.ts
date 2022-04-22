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

  // @ts-ignore
  username: string;
  // @ts-ignore
  private roles: string[];
  isLoggedIn = false;
  showManagementBoard = false;
  showAddReviewBoard = false;

  constructor(private tokenStorageService: TokenStorageService, private _snackBar: MatSnackBar, private router: Router) {
  }

  // @ts-ignore
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      if (this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_USER')) {
        this.showAddReviewBoard = true;
      }
      this.showManagementBoard = this.roles.includes('ROLE_ADMIN');
    }
  }

  // @ts-ignore
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
        setTimeout(() => {
          console.log("Delayed for 3.5 second.");
          window.location.reload();
        }, 3500);
      }
    });
  }
}
