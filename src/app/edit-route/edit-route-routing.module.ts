import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRoutePage } from './edit-route.page';

const routes: Routes = [
  {
    path: '',
    component: EditRoutePage
  },
  {
    path: 'id',
    component: EditRoutePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRoutePageRoutingModule {}
