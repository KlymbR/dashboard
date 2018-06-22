import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClimbService } from '../climb.service';
import { IPath, IStat } from '../interfaces';

@Component({
  selector: 'app-grips',
  templateUrl: './grips.component.html',
  styleUrls: ['./grips.component.css']
})
export class GripsComponent implements OnInit, AfterViewInit {
  public path: IPath;
  public stats: Array<IStat>;

  constructor(private route: ActivatedRoute, private climbService: ClimbService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.route.params.subscribe((params) => {
      this.climbService.getPath(params.id).subscribe((res) => {
        if (res.success) {
          this.path = res.result;
        }
      });
      this.climbService.getStat(params.id).subscribe((res) => {
        this.stats = res;
      });
    });
  }

  toogleFree() {
    let free: boolean;
    if (this.path.path_free) {
      free = false;
    } else { free = true; }
    this.climbService.postPathFree(this.path.path_id, free).subscribe(() => {
      this.path.path_free = free;
    });
  }
}
