import { Component, AfterViewInit } from '@angular/core';
import { RoomService } from '@room/room.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.pug',
  styleUrls: ['./rooms.page.scss']
})
export class RoomsComponent implements AfterViewInit {
  public loading: boolean;
  public rooms: Array<Object>;

  constructor(
    private roomService: RoomService,
    private snackBar: MatSnackBar
  ) {
    this.loading = true;
    this.rooms = [];
  }

  ngAfterViewInit() {
    this.roomService.getAllRooms().subscribe((response) => {
      this.rooms = response;
      this.loading = false;
    }, (error) => {
      this.snackBar.open(error.statusText, undefined, {
        duration: 2000
      });
      this.loading = false;
    });
  }

  link(id: string) { return '/rooms/' + id; }
}
