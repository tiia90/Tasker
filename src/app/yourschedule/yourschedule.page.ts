import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { MenuPage } from '../menu/menu.page';
import { PopoverController } from '@ionic/angular';
import { StorageItem } from '../shared/noteItem';
import { TasksService } from '../services/tasks.service';
import { RefresherEventDetail } from '@ionic/core';

@Component({
  selector: 'app-yourschedule',
  templateUrl: './yourschedule.page.html',
  styleUrls: ['./yourschedule.page.scss'],
})
export class YourschedulePage implements OnInit {

  today : number = Date.now()
  filter: 'all' | 'active' | 'status' = 'all';
  tasks: StorageItem[] = [];
  newTask: StorageItem
 
  constructor(  

    private authService: AuthService,
    private route: Router,
    public modalCtrl:ModalController,
    private popoverCtrl:PopoverController,
    private taskService: TasksService,
    private alertController: AlertController) { 
    }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.taskService.getTasks().then(
      data => this.tasks = data
    );
  }





  goEditTask(id:number) {
    this.route.navigate(['/taskdetails', id]);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).then(
      () => this.taskService.getTasks().then(
        data => this.tasks = data
      )
    );
    
  }

  async presentAlertConfirm(id: number, title: string) {
    console.log('alert');
    const alert = await this.alertController.create({
      header: 'Delete task',
      message: `Are you sure you want to delete task <strong> ${title}</strong>?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Delete',
          handler: () => {
            this.deleteTask(id);
          }
        }
      ]
    });

    await alert.present();
  }

  nextpage() {
    this.route.navigate(['/taskdetails']);
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

  addItem(title:string, content:string, lastUpdated:string) {
    var dateAndTime = lastUpdated.split('T')[0] + " at " + lastUpdated.split('T')[1].slice(0, 8);

    this.newTask = {"title": title, "content": content, "lastUpdated": dateAndTime, done: false};
    
    this.taskService.saveTask(this.newTask).then(
      () => this.taskService.getTasks().then(
        data => this.tasks = data
      )
    );

    this.modalCtrl.dismiss();

  }

  currentModal = null;

  async openModal(opts = {}) {
    const modal = await this.modalCtrl.create({
      component: 'modal-content',
      ...opts,
    });
    modal.present();

    this.currentModal = modal;
  }
} 
