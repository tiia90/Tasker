import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yourschedule',
  templateUrl: './yourschedule.page.html',
  styleUrls: ['./yourschedule.page.scss'],
})
export class YourschedulePage implements OnInit {

  constructor(private route: Router) { }
  ngOnInit(): void {
  }

  nextpage() {
    this.route.navigate(['/home']);
  }
}
