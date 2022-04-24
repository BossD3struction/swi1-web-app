import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {User} from "../../models/user";
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  content!: string;
  currentUser: any;

  displayedColumns: string[] = ['id', 'username', 'email', 'password', 'admin'];
  dataSource = new MatTableDataSource<User>();

  constructor(private userService: UserService, private token: TokenStorageService, private _liveAnnouncer: LiveAnnouncer) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`).then();
    } else {
      this._liveAnnouncer.announce('Sorting cleared').then();
    }
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if (this.currentUser != null && this.currentUser.roles == 'ROLE_ADMIN') {
      this.userService.listUsers().subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, err => {
          this.content = JSON.parse(err.error).message;
        }
      );
    }
  }

}
