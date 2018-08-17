import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  public subscribeFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.subscribeFormGroup = this.formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]]
    });
  }

  public onSubmit() {
    if (this.subscribeFormGroup.valid) {
      console.log('subscribe');
      /*
      email: this.subscribeFormGroup.controls['emailCtrl'].value,
      */
    }
  }
}
