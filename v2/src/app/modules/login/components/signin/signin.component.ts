import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '@app/modules/login/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.pug',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public signinFormGroup: FormGroup;
  public remember: boolean;
  public loading: boolean;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {
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
        }
        this.loading = false;
      }, () => {
        this.loading = false;
      });
      console.log('remember:', this.remember);
    }
  }
}
