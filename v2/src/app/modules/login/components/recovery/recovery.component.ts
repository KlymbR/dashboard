import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '@app/modules/login/login.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.pug',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  public recoveryFormGroup: FormGroup;
  public loading: boolean;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {
    this.loading = false;
  }

  ngOnInit() {
    this.recoveryFormGroup = this.formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]]
    });
  }

  public onSubmit() {
    if (this.recoveryFormGroup.valid) {
      this.loading = true;
      this.loginService.postRecovery(this.recoveryFormGroup.controls['emailCtrl'].value).subscribe((response) => {
        console.log('recovery:', response);
        this.loading = false;
      }, () => {
        this.loading = false;
      });
    }
  }

}
