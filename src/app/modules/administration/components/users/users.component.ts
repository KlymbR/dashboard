import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { AdministrationService } from '@app/modules/administration/administration.service';
import { MatTableDataSource, MatSort, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.pug',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  public displayedColumns = ['lastName', 'firstName', 'email', 'phone'];
  public dataSource;
  public loading: boolean;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private administrationService: AdministrationService,
    private snackBar: MatSnackBar
  ) {
    this.loading = true;
  }

  ngAfterViewInit() {
    this.administrationService.getAllUsers().subscribe((res) => {
      if (res.success) {
        this.dataSource = new MatTableDataSource(res.result);
        this.dataSource.sort = this.sort;
      }
      this.loading = false;
    }, (error) => {
      this.snackBar.open(error.statusText, undefined, {
        duration: 2000
      });
      this.loading = false;
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
