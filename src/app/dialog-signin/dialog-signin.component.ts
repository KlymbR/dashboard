import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { IRegister, ILogin } from '../interfaces';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dialog-signin',
  templateUrl: './dialog-signin.component.html',
  styleUrls: ['./dialog-signin.component.css']
})
export class DialogSigninComponent implements OnInit {
  public loading: boolean;

  constructor(private authService: AuthService,
    public dialogRef: MatDialogRef<DialogSigninComponent>) { }

  ngOnInit() {
    this.loading = false;
  }

  public registered(register: IRegister) {
    this.loading = true;
    this.authService.postSignup(register).subscribe((data: any) => {
      console.log(data);
      this.dialogRef.close();
    }, (error: any) => {
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  public logged(login: ILogin) {
    this.loading = true;
    this.authService.postSignin(login).subscribe((data: any) => {
      console.log(data);
      this.dialogRef.close();
    }, (error: any) => {
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  public mailed(email: string) {
    this.loading = true;
    this.authService.postRecovery(email).subscribe((data: any) => {
      console.log(data);
      this.dialogRef.close();
    }, (error: any) => {
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

  public linked(data: any) {
    console.log(data);
  }
}
