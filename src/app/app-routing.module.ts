import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modulo-principal/components/login/login.component';
import { HomeComponent } from './modulo-principal/components/home/home.component';
import { EventsComponent } from './modulo-principal/components/events/events.component';
import { RegistroComponent } from './modulo-principal/components/registro/registro.component';
import { NosotrosComponent } from './modulo-principal/components/nosotros/nosotros.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegistroComponent,
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'aboutUs',
    component: NosotrosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
