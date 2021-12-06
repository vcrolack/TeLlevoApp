import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular'; 
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Params } from '@angular/router';

import { RoutesService } from '../services/routes/routes.service';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.page.html',
  styleUrls: ['./edit-route.page.scss'],
})
export class EditRoutePage implements OnInit {

  routeForm: FormGroup;
  route_id;

  constructor(
    private formBuilder: FormBuilder,
    private routeService: RoutesService,
    private navController: NavController,
    private storage: Storage,
    private actRoute: ActivatedRoute
  ) {
    this.storage.create();
    this.routeForm = this.formBuilder.group({
      campus: new FormControl("", Validators.compose([Validators.required])),
      destiny: new FormControl("", Validators.compose([Validators.required])),
      rate: new FormControl("", Validators.compose([Validators.required]))
    })
  }

  ngOnInit() {
    this.route_id = this.actRoute.snapshot.params.id;
  }

  updateRoute(dataRoute) {
    console.log(this.route_id)
    this.routeService.updateRoute(this.route_id, dataRoute);

  }

  cancelEdit(): void {
    this.navController.back();
  }

  

}
