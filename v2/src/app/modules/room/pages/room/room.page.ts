import { Component, AfterViewInit } from '@angular/core';
import { RoomService } from '@app/modules/room/room.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.pug',
  styleUrls: ['./room.page.scss']
})
export class RoomComponent implements AfterViewInit {
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
