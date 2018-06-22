import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClimbService } from '../climb.service';
import { IPath } from '../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ways',
  templateUrl: './ways.component.html',
  styleUrls: ['./ways.component.css']
})
export class WaysComponent implements OnInit, AfterViewInit {
  public paths: Array<IPath>;

  constructor(private climbService: ClimbService, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.climbService.getAllPaths().subscribe((res) => {
      if (res.success) {
        this.paths = res.result;
      }
    });
  }

  detailPath(id: number) {
    this.router.navigate(['/grips/', id]);
  }
}
