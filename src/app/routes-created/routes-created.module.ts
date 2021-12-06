import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoutesCreatedPageRoutingModule } from './routes-created-routing.module';

import { RoutesCreatedPage } from './routes-created.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoutesCreatedPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RoutesCreatedPage]
})
export class RoutesCreatedPageModule {}
