import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourschedulePage } from './yourschedule.page';

const routes: Routes = [
  {
    path: '',
    component: YourschedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourschedulePageRoutingModule {}
