import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/models/user';
import {TokenStorageService} from 'src/app/services/token-storage.service';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // @ts-ignore
  content: string;
  currentUser: any;

  users: User[] = [];

  constructor(private userService: UserService, private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if (this.currentUser != null && this.currentUser.roles == 'ROLE_ADMIN') {
      this.userService.listUsers().subscribe(
        data => {
          this.users = data;
        }, err => {
          this.content = JSON.parse(err.error).message;
        }
      );
  }
  }

}
