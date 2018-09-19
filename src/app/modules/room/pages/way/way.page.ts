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
  public room: string;
  public way: Object;
  public stats: Array<Object>;

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
    this.activatedRoute.params.subscribe((params) => {
      this.roomService.getPath(params.way).subscribe((response) => {
        if (response.success) { this.way = response.result; }
        console.log(this.way);
        this.roomService.getStats(params.way).subscribe((res) => {
          if (res && res.success) { this.stats = res.result; }
          console.log(this.stats);
          this.loading = false;
        }, (error) => {
          this.snackBar.open(error.statusText, undefined, {
            duration: 2000
          });
          this.loading = false;
        });
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
    this.roomService.freePath(this.way['path_id'], !this.way['path_free']).subscribe((res) => {
      if (res.success) {
        this.roomService.getPath(this.way['path_id']).subscribe((response) => {
          if (response.success) { this.way = response.result; }
          this.loading = false;
        }, (error) => {
          this.snackBar.open(error.statusText, undefined, {
            duration: 2000
          });
          this.loading = false;
        });
      }
    });
  }
}
