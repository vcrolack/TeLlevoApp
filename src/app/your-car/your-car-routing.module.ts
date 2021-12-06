import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourCarPage } from './your-car.page';

const routes: Routes = [
  {
    path: '',
    component: YourCarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourCarPageRoutingModule {}
