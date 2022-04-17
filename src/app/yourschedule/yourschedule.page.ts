import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { MenuPage } from '../menu/menu.page';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-yourschedule',
  templateUrl: './yourschedule.page.html',
  styleUrls: ['./yourschedule.page.scss'],
})
export class YourschedulePage implements OnInit {

  todoList = [{
    itemName : 'Shopping',
    itemDate : '20-04-22',
    itemDetails : 'bread, cheece, milk'
  },
  {
    itemName : 'Homework',
    itemDate : '22-04.22',
    itemDetails : 'dishes, cleaning'
  
  }]
 
  constructor(  
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private route: Router,
    public modalCtrl:ModalController,
    private popoverCtrl:PopoverController) { }
  ngOnInit(): void {
  }

  nextpage() {
    this.route.navigate(['/taskdetails']);
  }

  async logout() {
    this.authService.logout();
    this.route.navigateByUrl('/login', { replaceUrl: true });
  }

today : number = Date.now()

//tämä jälkeen kaikki on kesken

taskName
taskDate
taskDetails
taskObject

  async dismiss(){
    await this.modalCtrl.dismiss(this.taskObject)
  }

  AddTask(){
    this.taskObject = ({itemName:this.taskName,
                        itemDate:this.taskDate,
                      itemDetails:this.taskDetails})

    this.dismiss()
  }

   async addTask(){
     const modal = await this.modalCtrl.create({
       component: this.AddTask
     })

     modal.onDidDismiss().then(newTaskObject =>{
       console.log(newTaskObject.data);
       this.todoList.push(newTaskObject.data)
     })
     return await modal.present()
   }
   
   3
	
  async openMenu(ev) {
    const popover = await this.popoverCtrl.create({
      component: MenuPage,
      event: ev,
      cssClass: 'menu-popover'
    });
  
    await popover.present();
  }

}