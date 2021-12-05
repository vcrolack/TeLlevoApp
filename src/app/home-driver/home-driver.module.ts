import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeDriverPageRoutingModule } from './home-driver-routing.module';

import { HomeDriverPage } from './home-driver.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeDriverPageRoutingModule
  ],
  declarations: [HomeDriverPage]
})
export class HomeDriverPageModule {}
