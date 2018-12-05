import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '@login/login.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.cookieService.deleteAll();
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
        this.loginService.token = response.token;
        localStorage.setItem('user', JSON.stringify(response.user));
        this.snackBar.open('Successful connected!', undefined, {
          duration: 2000
        });
        const name = `${response.user.firstname} ${response.user.lastname}`;
        this.cookieService.set('name', name);
        localStorage.setItem('rights', JSON.stringify(response.user.isAdmin));
        this.snackBar.open(`Welcome ${name}!`, undefined, {
          duration: 2000
        });
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/rooms';
        this.router.navigate([returnUrl]);
        this.loading = false;
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
