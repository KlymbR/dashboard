import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  public recoverFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.recoverFormGroup = this.formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]]
    });
  }

  public onSubmit() {
    if (this.recoverFormGroup.valid) {
      console.log('recover');
      /*
      email: this.recoverFormGroup.controls['emailCtrl'].value,
      */
    }
  }

}
