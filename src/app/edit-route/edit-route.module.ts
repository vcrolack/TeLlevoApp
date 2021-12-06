import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRoutePageRoutingModule } from './edit-route-routing.module';

import { EditRoutePage } from './edit-route.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRoutePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditRoutePage]
})
export class EditRoutePageModule {}
