import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/*import { Calendar } from '@awesome-cordova-plugins/calendar/ngx';*/

@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.page.html',
  styleUrls: ['./taskdetails.page.scss'],
})
export class TaskdetailsPage implements OnInit {

  constructor(/*private calendar: Calendar, */private route:Router) { }

  ngOnInit():void {
  }


/*create_calendar() {
  this.calendar.createCalendar('MyCalendar').then(
    (msg) => { console.log(msg); },
    (err) => { console.log(err); }
  );
}*/
nextpage() {
  this.route.navigate(['/home']);
}



  today : number = Date.now()

}
