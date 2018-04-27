import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  public forgotFormGroup: FormGroup;

  @Output('mailed') mailed = new EventEmitter<string>();


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.forgotFormGroup = this.formBuilder.group({
      emailCtrl: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.forgotFormGroup.valid) {
      this.mailed.emit(this.forgotFormGroup.controls['emailCtrl'].value);
    }
  }
}
