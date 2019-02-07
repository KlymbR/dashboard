import { Component, AfterViewInit } from '@angular/core';
import { RoomService } from '@room/room.service';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.pug',
  styleUrls: ['./rooms.page.scss']
})
export class RoomsComponent implements AfterViewInit {
  public loading: boolean;
  public rooms: Array<Object>;
  public admin: boolean;
  public roomFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private snackBar: MatSnackBar
  ) {
    this.loading = true;
    this.rooms = [];
    this.admin = JSON.parse(localStorage.getItem('rights'));
  }

  ngOnInit() {
    this.roomFormGroup = this.formBuilder.group({
      titleCtrl: ['', Validators.required],
      latitudeCtrl: ['', Validators.required],
      longitudeCtrl: ['', Validators.required]
    });
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

  public onSubmit() {
    if (this.roomFormGroup.valid) {
      this.loading = true;
      const room = {
        title: this.roomFormGroup.controls['titleCtrl'].value,
        latitude: this.roomFormGroup.controls['latitudeCtrl'].value,
        longitude: this.roomFormGroup.controls['longitudeCtrl'].value,
        paths: [],
      };
      this.roomService.postRoom(room).subscribe((response) => {
        this.rooms.push(response);
        this.snackBar.open('Room created!', undefined, {
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
