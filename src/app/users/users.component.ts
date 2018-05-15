import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private data = [
    {
      firstname: 'TEST',
      lastname: 'Test',
      email: 'test@test.test',
      phone: '+33678901234'
    },
    {
      firstname: 'TEST',
      lastname: 'Test',
      email: 'test@test.test',
      phone: '+33678901234'
    },
    {
      firstname: 'LOL',
      lastname: 'Lol',
      email: 'test@test.test',
      phone: '+33678901234'
    },
    {
      firstname: 'TEST',
      lastname: 'Test',
      email: 'test@test.test',
      phone: '+33678904321'
    },
    {
      firstname: 'TEST',
      lastname: 'Test',
      email: 'test@test.test',
      phone: '+33678901234'
    },
    {
      firstname: 'TEST',
      lastname: 'Test',
      email: 'test@test.test',
      phone: '+33678901234'
    },
  ];
  public displayedColumns = ['firstname', 'lastname', 'email', 'phone'];
  public dataSource;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    if (this.dataSource) {
      this.dataSource.filter = filterValue;
    }
  }
}
