import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarModule } from 'ion2-calendar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.page.html',
  styleUrls: ['./taskdetails.page.scss'],
})
export class TaskdetailsPage implements OnInit {

  constructor(
    private calendar: CalendarModule, 
    private route:Router,
    private authService: AuthService
    ) { }

  ngOnInit():void {
  }


  date: string;
  type: 'string';

  onChange($event) {
    console.log($event);
  }

nextpage() {
  this.route.navigate(['/home']);
}

async logout() {
  this.authService.logout();
  this.route.navigateByUrl('/login', { replaceUrl: true });
}
  today : number = Date.now()
}
