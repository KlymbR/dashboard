import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { LoginService } from '@login/login.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.pug',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  public subscribeFormGroup: FormGroup;
  public loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.subscribeFormGroup = this.formBuilder.group({
      genderCtrl: ['', Validators.required],
      lastNameCtrl: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$')
      ]],
      firstNameCtrl: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$')
      ]],
      birthdayCtrl: ['', Validators.required],
      phoneCtrl: ['', [
        Validators.required,
        Validators.pattern('^\\+\\d{11}$')
      ]],
      addressNumberCtrl: ['', Validators.required],
      addressWayCtrl: ['', Validators.required],
      addressPostalCodeCtrl: ['', Validators.required],
      addressCityCtrl: ['', Validators.required],
      emailCtrl: ['', [
        Validators.required,
        Validators.email
      ]],
      passwordCtrl: ['', [
        Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!"#$%\'()*+,-.\/:;=>?@^_`|~]).{8,16}$')
      ]],
      confirmCtrl: ['', Validators.required]
    }, {
        validator: function (absControl: AbstractControl) {
          if (absControl.get('passwordCtrl').value !== absControl.get('confirmCtrl').value) {
            absControl.get('confirmCtrl').setErrors({ MatchPassword: true });
          }
        }
      });
  }

  public onSubmit() {
    if (this.subscribeFormGroup.valid) {
      this.loading = true;
      const lastName = this.subscribeFormGroup.controls['lastNameCtrl'].value.toUpperCase();
      const firstName = this.subscribeFormGroup.controls['firstNameCtrl'].value.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      const birthdate = moment(this.subscribeFormGroup.controls['birthdayCtrl'].value).format('YYYY-MM-DD');
      const register = {
        gender: (this.subscribeFormGroup.controls['genderCtrl'].value === 'Mr' ? 1 : 0),
        lastname: lastName,
        firstname: firstName,
        birthdate: birthdate,
        phone: this.subscribeFormGroup.controls['phoneCtrl'].value,
        email: this.subscribeFormGroup.controls['emailCtrl'].value,
        password: this.subscribeFormGroup.controls['passwordCtrl'].value,
        licenses: [],
        address: {
          number: this.subscribeFormGroup.controls['addressNumberCtrl'].value,
          street: this.subscribeFormGroup.controls['addressWayCtrl'].value,
          postalcode: this.subscribeFormGroup.controls['addressPostalCodeCtrl'].value,
          city: this.subscribeFormGroup.controls['addressCityCtrl'].value
        },
        tshirt: []
      };

      this.loginService.postSignup(register).subscribe((response) => {
        console.log('signup:', response);
        this.snackBar.open('Successful registered!', undefined, {
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
