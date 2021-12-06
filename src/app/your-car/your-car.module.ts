import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourCarPageRoutingModule } from './your-car-routing.module';

import { YourCarPage } from './your-car.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourCarPageRoutingModule
  ],
  declarations: [YourCarPage]
})
export class YourCarPageModule {}
