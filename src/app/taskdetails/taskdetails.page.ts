import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageItem } from '../shared/noteItem';
import { TasksService } from 'src/app/services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { MenuPage } from '../menu/menu.page';

/*
import { Calendar } from '@awesome-cordova-plugins/calendar/ngx';
import { IonDatetime } from '@ionic/angular';
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';
*/

@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.page.html',
  styleUrls: ['./taskdetails.page.scss'],
})

export class TaskdetailsPage implements OnInit {


  today : number = Date.now()
  newTask: StorageItem
  task: StorageItem
  tasks: StorageItem[] = [];
  

  constructor(
    private tasksService: TasksService,
    private router: ActivatedRoute,
    private route: Router,
    private popoverCtrl:PopoverController,
    private taskService: TasksService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
    if (id != null) {
      this.task = this.tasksService.getTask(+id);
    }
  }

  saveTask() {
    this.tasksService.saveTask(this.task);
  }

  nextpage() {
    this.route.navigate(['/yourschedule']);

  }

  async logout() {
    this.authService.logout();
    this.route.navigateByUrl('/login', { replaceUrl: true });
  }

  async openMenu(ev) {
    const popover = await this.popoverCtrl.create({
      component: MenuPage,
      event: ev,
      cssClass: 'menu-popover'
    });
  
    await popover.present();
  }

  addItem(title:string, content:string, dueDate:string) {
    if (title === "") {
      title = this.task.title;
    }
    if (content === "") {
      content = this.task.content
    }

    if (dueDate !== "") {
      var filterDate = parseInt(dueDate.split("T")[0].split("-")[0] + dueDate.split("T")[0].split("-")[1] + dueDate.split("T")[0].split("-")[2])
      var dateAndTime = dueDate.split('T')[0]
    } else {
      var filterDate = this.task.dateForFilter
      var dateAndTime = this.task.lastUpdated
    }

    this.task = {"id": this.task.id, "title": title, "content": content, "lastUpdated": dateAndTime, done: false, "dateForFilter":filterDate};
    this.taskService.saveTask(this.task).then(
      () => this.taskService.getTasks().then(
        data => this.tasks = data
      )
    );
  }

  /*interface DatetimeChangeEventDetail {
    value?: string | null;
  }
  //new date time picker from here:

  
  @Component({…})
  export class MyComponent {
    @ViewChild(IonDatetime, { static: true }) datetime: IonDatetime;
  
    dateValue = '';
    dateValue2 = '';
  
    constructor() {}
    
    confirm() {
      this.datetime.nativeEl.confirm();
    }
    
    reset() {
      this.datetime.nativeEl.reset();
    }
  
    formatDate(value: string) {
      return format(parseISO(value), 'MMM dd yyyy');
    }
  
    isDateEnabled(dateIsoString: string) {
      const date = new Date(dateIsoString);
      if (getDate(date) === 1 && getMonth(date) === 0 && getYear(date) === 2022) {
        // Disables January 1, 2022.
        return false;
      }
      return true;
    }
  }*/
}