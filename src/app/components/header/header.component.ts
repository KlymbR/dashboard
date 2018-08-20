import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.pug',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public get settingsName() { return this.cookieService.get('name'); }
  public get connected() { return this.cookieService.check('token'); }

  constructor(private cookieService: CookieService) { }

  ngOnInit() {

  }
}
