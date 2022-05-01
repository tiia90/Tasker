import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskdetailsPageRoutingModule } from './taskdetails-routing.module';

import { TaskdetailsPage } from './taskdetails.page';

import { CalendarModule } from 'ion2-calendar';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: TaskdetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskdetailsPageRoutingModule,
    CalendarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TaskdetailsPage]
})
export class TaskdetailsPageModule {}
