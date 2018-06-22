import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['firstName', 'lastName', 'email', 'phone'];
  public dataSource;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.userService.getAllUsers().subscribe((res) => {
      if (res.success) {
        this.dataSource = new MatTableDataSource(res.result);
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    if (this.dataSource) {
      this.dataSource.filter = filterValue;
    }
  }
}
