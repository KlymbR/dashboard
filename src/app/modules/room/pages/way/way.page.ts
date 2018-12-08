import { Component, AfterViewInit, OnInit } from '@angular/core';
import { RoomService } from '@room/room.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-way',
  templateUrl: './way.page.pug',
  styleUrls: ['./way.page.scss']
})
export class WayComponent implements AfterViewInit, OnInit {
  public loading: boolean;
  public room_id: string;
  public room: any;
  public way: any;
  public stats: Array<Object>;
  public _id: string;
  public admin: boolean;
  public wayFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.loading = true;
    this.activatedRoute.params.subscribe((params) => {
      this._id = params.way;
      this.room_id = params.room;
    });
    this.admin = JSON.parse(localStorage.getItem('rights'));
  }

  ngOnInit() {
    this.wayFormGroup = this.formBuilder.group({
      dataCtrl: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.roomService.getRoom(this.room_id).subscribe((room) => {
      this.room = room;
    });
    this.activatedRoute.params.subscribe((params) => {
      this.roomService.getPath(this.room_id, this._id).subscribe((response) => {
        this.way = response;
        console.log(this.way);
        this.loading = false;
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
    this.roomService.patchPath(this.room_id, this.way._id, this.way).subscribe((res) => {
      this.way = res;
      this.loading = false;
    }, (error) => {
      this.snackBar.open(error.statusText, undefined, {
        duration: 2000
      });
      this.loading = false;
    });
  }

  public onSubmit() {
    if (this.wayFormGroup.valid) {
      this.loading = true;
      this.way.grips.push({
        id: Math.round(Math.random() * 10),
        data: this.wayFormGroup.controls['dataCtrl'].value,
        on: false
      });
      console.log(this.way);
      this.roomService.patchPath(this.room_id, this.way._id, this.way).subscribe((response) => {
        this.way = response;
        this.snackBar.open('Path created!', undefined, {
          duration: 2000
        });
        this.loading = false;
      }, (error) => {
        this.snackBar.open(error.statusText, undefined, {
          duration: 2000
        });
        this.loading = false;
      });
    }
  }

}
