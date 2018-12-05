import { Component, AfterViewInit } from '@angular/core';
import { RoomService } from '@app/modules/room/room.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.pug',
  styleUrls: ['./room.page.scss']
})
export class RoomComponent implements AfterViewInit {
  public loading: boolean;
  public paths: Array<Object>;
  public _id: string;
  public room: any;

  constructor(
    private roomService: RoomService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.loading = true;
    this.activatedRoute.params.subscribe((params) => {
      this._id = params.room;
    });
  }

  ngAfterViewInit() {
    this.roomService.getRoom(this._id).subscribe((room) => {
      this.room = room;
    });
    this.roomService.getAllPaths().subscribe((response) => {
      this.paths = response;
      console.log(this.paths);
      this.loading = false;
    }, (error) => {
      this.snackBar.open(error.statusText, undefined, {
        duration: 2000
      });
      this.loading = false;
    });
  }

  link(id: string) { return `/rooms/${this._id}/${id}`; }
}
