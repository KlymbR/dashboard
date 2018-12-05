import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '@login/login.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.pug',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  public recoveryFormGroup: FormGroup;
  public loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {
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
        this.snackBar.open('Recovery email sent!', undefined, {
          duration: 2000
        });
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
