import { Component, AfterViewInit } from '@angular/core';
import { RoomService } from '@room/room.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-way',
  templateUrl: './way.page.pug',
  styleUrls: ['./way.page.scss']
})
export class WayComponent implements AfterViewInit {
  public loading: boolean;

  constructor(
    private roomService: RoomService,
    private snackBar: MatSnackBar
  ) {
    this.loading = true;
  }

  ngAfterViewInit() {
    this.roomService.getAllPaths().subscribe((response) => {
      console.log(response);
      this.loading = false;
    }, (error) => {
      this.snackBar.open(error.statusText, undefined, {
        duration: 2000
      });
      this.loading = false;
    });
  }

}
