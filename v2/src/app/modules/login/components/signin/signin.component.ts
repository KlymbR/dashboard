import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.pug',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public signinFormGroup: FormGroup;
  public remember: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signinFormGroup = this.formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      passwordCtrl: ['', Validators.required]
    });
  }

  public onSubmit() {
    if (this.signinFormGroup.valid) {
      console.log('login:', this.remember);
      /*
      email: this.signinFormGroup.controls['emailCtrl'].value,
      password: this.signinFormGroup.controls['passwordCtrl'].value
      */
    }
  }
}
