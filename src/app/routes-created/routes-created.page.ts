import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes/routes.service';
import { Storage } from '@ionic/storage';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routes-created',
  templateUrl: './routes-created.page.html',
  styleUrls: ['./routes-created.page.scss'],
})
export class RoutesCreatedPage implements OnInit {

  user_id;
  routes;

  constructor(
    private routeService: RoutesService,
    private storage: Storage,
    private navController: NavController,
    private router: Router
  ) {
    
  }

  async ngOnInit() {
    this.storage.create();
    let user_id = await this.getUserId();
    //console.log(user_id)
    await this.getUsersRoutes(user_id);
  }



  async getUserId() {
    this.user_id = await this.routeService.getUserId()
    //console.log(user_id)
    return this.user_id;
  }



  async getUsersRoutes(id) {
    this.routes = await this.routeService.getUsersRoute(id).then(
      
    )
    //console.log(this.routes)
    return this.routes

    //CONVERTIR EL ARRAY DE OBJETOS A UNO SOLO CON MAP

  }

  async deleteRoute(route_id, user_id) {
    await this.routeService.deleteRoute(route_id)
    //console.log(this.getUsersRoutes(user_id));


  }


  moveToHomeDriver(): void {
    this.navController.navigateForward("home-driver");
  }
  moveToEdit(): void {
    this.navController.navigateForward("edit-route");
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getUsersRoutes(this.user_id);
      event.target.complete();
    }, 1500)
  }
}
