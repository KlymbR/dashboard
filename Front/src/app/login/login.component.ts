import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ILogin } from '../interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;

  @Output('logged') logged = new EventEmitter<ILogin>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginFormGroup = this.formBuilder.group({
      emailCtrl: ['', Validators.required],
      passwordCtrl: ['', Validators.required]
    });
  }

  public onSubmit() {
    if (this.loginFormGroup.valid) {
      this.logged.emit({
        email: this.loginFormGroup.controls['emailCtrl'].value,
        password: this.loginFormGroup.controls['passwordCtrl'].value
      });
    }
  }
}
