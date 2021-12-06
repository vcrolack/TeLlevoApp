import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EditRoutePage } from './edit-route/edit-route.page';
import { LoginGuard } from './guards/login/login.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [LoginGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./recuperar-password/recuperar-password.module').then( m => m.RecuperarPasswordPageModule)
  },
  {
    path: 'home-driver',
    loadChildren: () => import('./home-driver/home-driver.module').then( m => m.HomeDriverPageModule)
  },
  {
    path: 'crear-viaje',
    loadChildren: () => import('./crear-viaje/crear-viaje.module').then( m => m.CrearViajePageModule)
  },
  {
    path: 'routes-created',
    loadChildren: () => import('./routes-created/routes-created.module').then( m => m.RoutesCreatedPageModule)
  },
  {
    path: 'edit-route',
    loadChildren: () => import('./edit-route/edit-route.module').then( m => m.EditRoutePageModule)
  },
  {
    path:'edit-route/:id',
    component: EditRoutePage
  },
  {
    path: 'your-car',
    loadChildren: () => import('./your-car/your-car.module').then( m => m.YourCarPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then( m => m.SchedulePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
