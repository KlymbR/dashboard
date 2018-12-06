import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AccountService } from '@app/modules/account/account.service';
import { MatDialog } from '@angular/material';
import { DialogDeleteComponent } from '@app/modules/account/components/dialog-delete/dialog-delete.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.pug',
  styleUrls: ['./account.page.scss']
})
export class AccountComponent implements OnInit, AfterViewInit {
  public accountFormGroup: FormGroup;
  public loading: boolean;
  private id: string;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private accountService: AccountService,
    private dialogDelete: MatDialog,
    private router: Router
  ) {
    this.loading = true;
  }

  ngOnInit() {
    this.accountFormGroup = this.formBuilder.group({
      lastNameCtrl: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$')
      ]],
      firstNameCtrl: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.\'-]+$')
      ]],
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
    });
  }

  ngAfterViewInit() {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    this.accountService.getUser(savedUser._id).subscribe((user) => {
      this.id = user._id;
      this.accountFormGroup.controls['lastNameCtrl'].setValue(user.lastname);
      this.accountFormGroup.controls['firstNameCtrl'].setValue(user.firstname);
      this.accountFormGroup.controls['phoneCtrl'].setValue(user.phone);
      this.accountFormGroup.controls['addressNumberCtrl'].setValue(user.address.number);
      this.accountFormGroup.controls['addressWayCtrl'].setValue(user.address.street);
      this.accountFormGroup.controls['addressPostalCodeCtrl'].setValue(user.address.postalcode);
      this.accountFormGroup.controls['addressCityCtrl'].setValue(user.address.city);
      this.accountFormGroup.controls['emailCtrl'].setValue(user.email);
      this.loading = false;
    }, (error) => {
      this.snackBar.open(error.statusText, undefined, {
        duration: 2000
      });
      this.loading = false;
    });
  }

  public onSubmit() {
    if (this.accountFormGroup.valid) {
      const lastName = this.accountFormGroup.controls['lastNameCtrl'].value.toUpperCase();
      const firstName = this.accountFormGroup.controls['firstNameCtrl'].value.replace(/\w\S*/g, (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      const edit = {
        lastname: lastName,
        firstname: firstName,
        phone: this.accountFormGroup.controls['phoneCtrl'].value,
        email: this.accountFormGroup.controls['emailCtrl'].value,
        address: {
          number: this.accountFormGroup.controls['addressNumberCtrl'].value,
          street: this.accountFormGroup.controls['addressWayCtrl'].value,
          postalcode: this.accountFormGroup.controls['addressPostalCodeCtrl'].value,
          city: this.accountFormGroup.controls['addressCityCtrl'].value
        }
      };
      this.accountService.patchUser(this.id, edit).subscribe((response) => {
        console.log('edit account:', response);
        this.snackBar.open('Successful edited!', undefined, {
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

  public delete() {
    if (this.id) {
      const dialogRef = this.dialogDelete.open(DialogDeleteComponent, {
        width: '250px'
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.accountService.deleteUser(this.id).subscribe();
          this.router.navigateByUrl('/login');
        }
      });
    }
  }
}

