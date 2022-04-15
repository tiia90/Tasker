import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourschedulePageRoutingModule } from './yourschedule-routing.module';

import { YourschedulePage } from './yourschedule.page';
import { InputModule } from '../components/input/input.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputModule,
    YourschedulePageRoutingModule
  ],
  declarations: [YourschedulePage]
})
export class YourschedulePageModule {}
