import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../user.service';
import { IUser, IRegister } from '../interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterViewInit {
  public user: IUser & IRegister;
  public accountFormGroup: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.userService.getUser().subscribe((res) => {
      if (res.success) {
        this.user = res.result;
        this.accountFormGroup = this.formBuilder.group({
          lastnameCtrl: [this.user.lastName, Validators.required],
          firstnameCtrl: [this.user.firstName, Validators.required],
          emailCtrl: [this.user.email, [Validators.required, Validators.email]],
          phoneCtrl: [this.user.phone, Validators.required],
          addressNumberCtrl: [this.user.address.number, Validators.required],
          addressStreetCtrl: [this.user.address.street, Validators.required],
          addressPostalCodeCtrl: [this.user.address.postalCode, Validators.required],
          addressCityCtrl: [this.user.address.city, Validators.required]
        });
      }
    });
  }

  editAccount(event: Event) {
    event.preventDefault();
    if (this.accountFormGroup.valid) {
      const update: IUser = {
        email: this.accountFormGroup.controls['emailCtrl'].value,
        phone: this.accountFormGroup.controls['phoneCtrl'].value,
        firstName: this.accountFormGroup.controls['firstnameCtrl'].value,
        lastName: this.accountFormGroup.controls['lastnameCtrl'].value,
        address: {
          number: this.accountFormGroup.controls['addressNumberCtrl'].value,
          street: this.accountFormGroup.controls['addressStreetCtrl'].value,
          postalCode: this.accountFormGroup.controls['addressPostalCodeCtrl'].value,
          city: this.accountFormGroup.controls['addressCityCtrl'].value
        }
      };

      this.userService.patchUser(update).subscribe(() => {
        this.user.email = update.email;
        this.user.phone = update.phone;
        this.user.firstName = update.firstName;
        this.user.lastName = update.lastName;
        this.user.address = update.address;
      });
    }
  }
}
