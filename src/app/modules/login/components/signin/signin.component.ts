import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '@login/login.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.pug',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public signinFormGroup: FormGroup;
  public remember: boolean;
  public loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.signinFormGroup = this.formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      passwordCtrl: ['', Validators.required]
    });
  }

  public onSubmit() {
    if (this.signinFormGroup.valid) {
      this.loading = true;
      const log = {
        email: this.signinFormGroup.controls['emailCtrl'].value,
        password: this.signinFormGroup.controls['passwordCtrl'].value
      };
      this.loginService.postSignin(log).subscribe((response) => {
        console.log('signin:', response);
        if (response.success) {
          this.loginService.token = response.token;
          this.snackBar.open('Successful connected!', undefined, {
            duration: 2000
          });
        }
        this.loading = false;
      }, (error) => {
        this.snackBar.open(error.statusText, undefined, {
          duration: 2000
        });
        this.loading = false;
      });
      console.log('remember:', this.remember);
    }
  }
}
