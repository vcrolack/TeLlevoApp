import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearViajePageRoutingModule } from './crear-viaje-routing.module';

import { CrearViajePage } from './crear-viaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearViajePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrearViajePage]
})
export class CrearViajePageModule {}
