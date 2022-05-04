import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { MenuPage } from '../menu/menu.page';
import { PopoverController } from '@ionic/angular';
import { StorageItem } from '../shared/noteItem';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-yourschedule',
  templateUrl: './yourschedule.page.html',
  styleUrls: ['./yourschedule.page.scss'],
})
export class YourschedulePage implements OnInit {

  today : number = Date.now();
  tasks: StorageItem[] = [];
  newTask: StorageItem;
  sortNameState: string = "none";
  sortDateState: string = "none";

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
    )
    document.getElementById('nameHolder').insertAdjacentHTML('afterbegin', '<ion-icon name="remove-outline"></ion-icon>')
    document.getElementById('dateHolder').insertAdjacentHTML('afterbegin', '<ion-icon name="remove-outline"></ion-icon>')
    ;
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

  addItem(title:string, content:string, dueDate:string) {
    var filterDate = dueDate.slice(0,4) //+ dueDate.slice(5,7) + dueDate.slice(8-10)
    var dateAndTime = dueDate.split('T')[0] + " at " + dueDate.split('T')[1].slice(0, 5);
    this.newTask = {"title": title, "content": content, "lastUpdated": filterDate, done: false, "dateForFilter": filterDate};

    this.taskService.saveTask(this.newTask).then(
      () => this.taskService.getTasks().then(
        data => this.tasks = data
      )
    );
    this.sortNameState = "none";
    this.sortDateState = "none"

    this.modalCtrl.dismiss();

  }

  cancelItem() { //cancellaa taskin kun tekee uutta taskia
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

  sortName() {
    if(this.sortNameState ==="asc")  {
      this.tasks.sort((a, b) => a.title.localeCompare(b.title)).reverse()
      this.sortNameState = "desc"
      document.getElementById('nameHolder').innerHTML = ""
      document.getElementById('nameHolder').insertAdjacentHTML('afterbegin', '<ion-icon name="chevron-up"></ion-icon>')

    } else if (this.sortNameState === "desc") {
      this.tasks.sort((a, b) => a.title.localeCompare(b.title))
      this.sortNameState = "asc"
      document.getElementById('nameHolder').innerHTML = ""
      document.getElementById('nameHolder').insertAdjacentHTML('afterbegin', '<ion-icon name="chevron-down"></ion-icon>')
    
    } else if (this.sortNameState === "none") {
      this.tasks.sort((a, b) => a.title.localeCompare(b.title))
      this.sortNameState = "asc"
      document.getElementById('nameHolder').innerHTML = ""
      document.getElementById('nameHolder').insertAdjacentHTML('afterbegin', '<ion-icon name="chevron-down"></ion-icon>')
    
    } 
    //No longer sorted by date
    this.sortDateState = "none"

  }

  sortDate() {
    if(this.sortNameState ==="asc")  {
      this.tasks.sort((a, b) => parseInt(a.dateForFilter) - parseInt(b.dateForFilter)).reverse()
      this.sortDateState = "desc"
      document.getElementById('dateHolder').innerHTML = ""
      document.getElementById('dateHolder').insertAdjacentHTML('afterbegin', '<ion-icon name="chevron-up"></ion-icon>')

    } else if (this.sortNameState === "desc") {
      this.tasks.sort((a, b) => parseInt(a.dateForFilter) - parseInt(b.dateForFilter))
      this.sortDateState = "asc"
      document.getElementById('dateHolder').innerHTML = ""
      document.getElementById('dateHolder').insertAdjacentHTML('afterbegin', '<ion-icon name="chevron-down"></ion-icon>')
    
    } else if (this.sortNameState === "none") {
      this.tasks.sort((a, b) => parseInt(a.dateForFilter) - parseInt(b.dateForFilter))
      this.sortDateState = "asc"
      document.getElementById('dateHolder').innerHTML = ""
      document.getElementById('dateHolder').insertAdjacentHTML('afterbegin', '<ion-icon name="chevron-down"></ion-icon>')
    
      //No longer sorted by name
      this.sortNameState = "none"

    } 


  }
  


  /*compareName( a, b ) {
    if ( a.title < b.title ){
      return -1;
    }
    if ( a.title > b.title ){
      return 1;
    }
    return 0;
  }*/

}
