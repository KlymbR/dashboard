import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IRegister, IUser } from '../interfaces';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  public personnalFormGroup: FormGroup;
  public authenticationFormGroup: FormGroup;

  @Output('registered') registered = new EventEmitter<IRegister & IUser>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.personnalFormGroup = this.formBuilder.group({
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
      phoneCtrl: ['', Validators.required],
      addressNumberCtrl: ['', Validators.required],
      addressWayCtrl: ['', Validators.required],
      addressPostalCodeCtrl: ['', Validators.required],
      addressCityCtrl: ['', Validators.required]
    });
    this.authenticationFormGroup = this.formBuilder.group({
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

  onSubmit() {
    if (this.personnalFormGroup.valid && this.authenticationFormGroup.valid) {
      const lastName = this.personnalFormGroup.controls['lastNameCtrl'].value.toUpperCase();
      const firstName = this.personnalFormGroup.controls['firstNameCtrl'].value.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      const birth: Date = this.personnalFormGroup.controls['birthdayCtrl'].value;
      const month = (birth.getMonth() >= 10 ? birth.getMonth() : '0' + birth.getMonth());
      const day = (birth.getDate() >= 10 ? birth.getDate() : '0' + birth.getDate());
      this.registered.emit({
        gender: (this.personnalFormGroup.controls['genderCtrl'].value === 'Mr' ? 1 : 0),
        lastName: lastName,
        firstName: firstName,
        birthdate: `${birth.getFullYear()}-${month}-${day}`,
        phone: this.personnalFormGroup.controls['phoneCtrl'].value,
        email: this.authenticationFormGroup.controls['emailCtrl'].value,
        password: this.authenticationFormGroup.controls['passwordCtrl'].value,
        licenses: [],
        address: {
          number: this.personnalFormGroup.controls['addressNumberCtrl'].value,
          street: this.personnalFormGroup.controls['addressWayCtrl'].value,
          postalCode: this.personnalFormGroup.controls['addressPostalCodeCtrl'].value,
          city: this.personnalFormGroup.controls['addressCityCtrl'].value
        },
        isAdmin: false
      });
    }
  }

}
