import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

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
    private route: Router) { }
  ngOnInit(): void {
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
 



