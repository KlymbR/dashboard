import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IRegister } from '../interfaces';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  public personnalFormGroup: FormGroup;
  public authenticationFormGroup: FormGroup;

  @Output('registered') registered = new EventEmitter<IRegister>();

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
      birthdayCtrl: ['', Validators.required]
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
      this.registered.emit({
        gender: this.personnalFormGroup.controls['genderCtrl'].value,
        lastName: lastName,
        firstName: firstName,
        birthday: this.personnalFormGroup.controls['birthdayCtrl'].value,
        email: this.authenticationFormGroup.controls['emailCtrl'].value,
        password: this.authenticationFormGroup.controls['passwordCtrl'].value,
        created: new Date()
      });
    }
  }

}
