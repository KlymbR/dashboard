import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { DialogSigninComponent } from './dialog-signin/dialog-signin.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private _mobileQueryListener: () => void;
  public mobileQuery: MediaQueryList;

  constructor(public changeDetectorRef: ChangeDetectorRef, public router: Router,
    public media: MediaMatcher, public dialogSignin: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    // LOOK AT THE COOKIE !
  }

  openDialogSignin(): void {
    this.dialogSignin.open(DialogSigninComponent);
  }

  title(): string {
    const raw = this.router.url.split('/').filter(e => e.length > 0).pop();
    return raw[0].toUpperCase() + raw.substr(1);
  }

  signout(): void {
    // TODO
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
