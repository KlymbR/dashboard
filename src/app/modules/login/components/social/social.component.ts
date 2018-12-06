import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'angularx-social-login';
// import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.pug',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  constructor(/* private authService: AuthService */) { }

  ngOnInit() {
  }

  signInWithGoogle(): void {
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    // this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    // this.authService.signOut();
  }

}
