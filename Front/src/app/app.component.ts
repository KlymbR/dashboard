import { Component, OnDestroy, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { DialogSigninComponent } from './dialog-signin/dialog-signin.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private _mobileQueryListener: () => void;
  public mobileQuery: MediaQueryList;

  constructor(public changeDetectorRef: ChangeDetectorRef,
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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
