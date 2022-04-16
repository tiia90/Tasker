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
