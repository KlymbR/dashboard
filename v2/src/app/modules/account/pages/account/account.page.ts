import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.pug',
  styleUrls: ['./account.page.scss']
})
export class AccountComponent implements OnInit {
  public accountFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.accountFormGroup = this.formBuilder.group({
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
    if (this.accountFormGroup.valid) {
      const lastName = this.accountFormGroup.controls['lastNameCtrl'].value.toUpperCase();
      const firstName = this.accountFormGroup.controls['firstNameCtrl'].value.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      const birthdate = moment(this.accountFormGroup.controls['birthdayCtrl'].value).format('YYYY-MM-DD');
      const register = {
        gender: (this.accountFormGroup.controls['genderCtrl'].value === 'Mr' ? 1 : 0),
        lastName: lastName,
        firstName: firstName,
        birthdate: birthdate,
        phone: this.accountFormGroup.controls['phoneCtrl'].value,
        email: this.accountFormGroup.controls['emailCtrl'].value,
        password: this.accountFormGroup.controls['passwordCtrl'].value,
        licenses: [],
        address: {
          number: this.accountFormGroup.controls['addressNumberCtrl'].value,
          street: this.accountFormGroup.controls['addressWayCtrl'].value,
          postalCode: this.accountFormGroup.controls['addressPostalCodeCtrl'].value,
          city: this.accountFormGroup.controls['addressCityCtrl'].value
        },
        isAdmin: false
      };
      console.log(register);
    }
  }
}
