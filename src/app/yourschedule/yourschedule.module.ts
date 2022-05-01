import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourschedulePageRoutingModule } from './yourschedule-routing.module';

import { YourschedulePage } from './yourschedule.page';
import { InputModule } from '../components/input/input.module';

import { MenuPageModule } from '../menu/menu.module';
import { IonicStorageModule } from '@ionic/storage-angular';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputModule,
    YourschedulePageRoutingModule,
    MenuPageModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: [YourschedulePage]
})
export class YourschedulePageModule {}
