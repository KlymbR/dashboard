import { Component, AfterViewInit } from '@angular/core';
import { RoomService } from '@room/room.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-way',
  templateUrl: './way.page.pug',
  styleUrls: ['./way.page.scss']
})
export class WayComponent implements AfterViewInit {
  public loading: boolean;
  public room_id: string;
  public room: any;
  public way: any;
  public stats: Array<Object>;
  public _id: string;

  constructor(
    private roomService: RoomService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.loading = true;
    this.activatedRoute.params.subscribe((params) => {
      this._id = params.way;
      this.room_id = params.room;
    });
  }

  ngAfterViewInit() {
    this.roomService.getRoom(this.room_id).subscribe((room) => {
      this.room = room;
    });
    this.activatedRoute.params.subscribe((params) => {
      this.roomService.getPath(this._id).subscribe((response) => {
        this.way = response;
        console.log(this.way);
      }, (error) => {
        this.snackBar.open(error.statusText, undefined, {
          duration: 2000
        });
        this.loading = false;
      });
    });
  }

  free() {
    this.loading = true;
    this.way.free = !this.way.free;
    this.roomService.patchPath(this.way._id, this.way).subscribe((res) => {
      this.way = res;
      this.loading = false;
    }, (error) => {
      this.snackBar.open(error.statusText, undefined, {
        duration: 2000
      });
      this.loading = false;
    });
  }
}
