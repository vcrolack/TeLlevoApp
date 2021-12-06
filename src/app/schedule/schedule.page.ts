import { Component, OnInit } from '@angular/core';
import { RoutesService } from '../services/routes/routes.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  routes;

  constructor(
    private routeService: RoutesService,
    private navController: NavController
  ) {
    
  }

  async ngOnInit() {
    await this.getAllRoutes();
  }

  async getAllRoutes() {
    this.routes = await this.routeService.getAllRoutes();
    console.log(this.routes)
    return this.routes
  }

  goBack():void {
    this.navController.back();
  }









  doRefresh(event) {
    setTimeout(() => {
      this.getAllRoutes();
      event.target.complete();
    }, 1500)
  }

}
