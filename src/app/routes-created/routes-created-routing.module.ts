import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditRoutePage } from '../edit-route/edit-route.page';

import { RoutesCreatedPage } from './routes-created.page';

const routes: Routes = [
  {
    path: '',
    component: RoutesCreatedPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesCreatedPageRoutingModule {}
