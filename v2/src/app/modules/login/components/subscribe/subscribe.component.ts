import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.pug',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  public subscribeFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

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
      const lastName = this.subscribeFormGroup.controls['lastNameCtrl'].value.toUpperCase();
      const firstName = this.subscribeFormGroup.controls['firstNameCtrl'].value.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      const birth: Date = this.subscribeFormGroup.controls['birthdayCtrl'].value;
      const month = (birth.getMonth() >= 10 ? birth.getMonth() : '0' + birth.getMonth());
      const day = (birth.getDate() >= 10 ? birth.getDate() : '0' + birth.getDate());
      const register = {
        gender: (this.subscribeFormGroup.controls['genderCtrl'].value === 'Mr' ? 1 : 0),
        lastName: lastName,
        firstName: firstName,
        birthdate: `${birth.getFullYear()}-${month}-${day}`,
        phone: this.subscribeFormGroup.controls['phoneCtrl'].value,
        email: this.subscribeFormGroup.controls['emailCtrl'].value,
        password: this.subscribeFormGroup.controls['passwordCtrl'].value,
        licenses: [],
        address: {
          number: this.subscribeFormGroup.controls['addressNumberCtrl'].value,
          street: this.subscribeFormGroup.controls['addressWayCtrl'].value,
          postalCode: this.subscribeFormGroup.controls['addressPostalCodeCtrl'].value,
          city: this.subscribeFormGroup.controls['addressCityCtrl'].value
        },
        isAdmin: false
      };
      console.log(register);
    }
  }
}
