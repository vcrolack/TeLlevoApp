import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeDriverPage } from './home-driver.page';

const routes: Routes = [
  {
    path: '',
    component: HomeDriverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDriverPageRoutingModule {}
