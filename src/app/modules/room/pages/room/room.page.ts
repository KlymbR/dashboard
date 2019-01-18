import { Component, AfterViewInit, OnInit } from '@angular/core';
import { RoomService } from '@app/modules/room/room.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.pug',
  styleUrls: ['./room.page.scss']
})
export class RoomComponent implements AfterViewInit, OnInit {
  public loading: boolean;
  public paths: Array<Object>;
  public _id: string;
  public room: any;
  public admin: boolean;
  public pathFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.loading = true;
    this.activatedRoute.params.subscribe((params) => {
      this._id = params.room;
    });
    this.admin = JSON.parse(localStorage.getItem('rights'));
  }

  ngOnInit() {
    this.pathFormGroup = this.formBuilder.group({
      difficultyCtrl: ['', Validators.required],
      colorCtrl: ['', Validators.required],
      nameCtrl: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.roomService.getRoom(this._id).subscribe((room) => {
      this.room = room;
    });
    this.roomService.getAllPaths(this._id).subscribe((response) => {
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

  public onSubmit() {
    if (this.pathFormGroup.valid) {
      this.loading = true;
      const path = {
        difficulty: this.pathFormGroup.controls['difficultyCtrl'].value,
        color: this.pathFormGroup.controls['colorCtrl'].value,
        free: true,
        grips: [],
        name: this.pathFormGroup.controls['nameCtrl'].value,
        best: {}
      };
      this.roomService.postPath(this._id, path).subscribe((response) => {
        this.paths.push(response);
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
