import { Component, OnInit } from '@angular/core';
import { StorageItem } from '../shared/noteItem';
import { TasksService } from 'src/app/services/tasks.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { MenuPage } from '../menu/menu.page';

@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.page.html',
  styleUrls: ['./taskdetails.page.scss'],
})

export class TaskdetailsPage implements OnInit {


  today : number = Date.now()
  task: StorageItem
  tasks: StorageItem[]

  constructor(
    private tasksService: TasksService,
    private router: ActivatedRoute,
    private route: Router,
    private popoverCtrl:PopoverController,
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

}