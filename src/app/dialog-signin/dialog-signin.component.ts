import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { IRegister, IUser, ILogin } from '../interfaces';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dialog-signin',
  templateUrl: './dialog-signin.component.html',
  styleUrls: ['./dialog-signin.component.css']
})
export class DialogSigninComponent implements OnInit {
  public loading: boolean;

  constructor(private authService: AuthService,
    private userService: UserService,
    public dialogRef: MatDialogRef<DialogSigninComponent>) { }

  ngOnInit() {
    this.loading = false;
  }

  public registered(register: IRegister & IUser) {
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
      if (data.success) {
        this.userService.token = data.token;
        this.dialogRef.close();
      }
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
