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
  public room: string;

  constructor(
    private roomService: RoomService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.loading = true;
    this.activatedRoute.params.subscribe((params) => {
      this.room = params.room;
    });
  }

  ngAfterViewInit() {
    this.roomService.getAllPaths().subscribe((response) => {
      if (response.success) { this.paths = response.result; }
      console.log(this.paths);
      this.loading = false;
    }, (error) => {
      this.snackBar.open(error.statusText, undefined, {
        duration: 2000
      });
      this.loading = false;
    });
  }

  link(id: string) { return `/rooms/${this.room}/${id}`; }
}
