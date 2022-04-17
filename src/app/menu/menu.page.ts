import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
 
  constructor(
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private route: Router) { }
 
  ngOnInit() {}
 
  close() {
    this.popoverCtrl.dismiss();
  }

  async logout() {
    this.authService.logout();
    this.route.navigateByUrl('/login', { replaceUrl: true });
  }
}