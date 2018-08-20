import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.pug',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  public recoveryFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.recoveryFormGroup = this.formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]]
    });
  }

  public onSubmit() {
    if (this.recoveryFormGroup.valid) {
      console.log('recover');
      /*
      email: this.recoveryFormGroup.controls['emailCtrl'].value,
      */
    }
  }

}
