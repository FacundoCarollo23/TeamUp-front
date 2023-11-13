import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from "../shared/nav-bar/nav-bar.component";
import { MaterialModule } from "../material.module";
import { TitleComponent } from "../shared/title/title.component";
import { CardEventsComponent } from "../shared/cards/card-events/card-events.component";
import { HeroComponent } from "../shared/hero/hero.component";
import { EventsComponent } from './components/events/events.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from "@angular/router";
import { FooterComponent } from "../shared/footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {NgxPaginationModule} from 'ngx-pagination';
import { DashboardEventsComponent } from './components/dashboard-events/dashboard-events.component';

const appRoutes:Routes=[
  {path:'', component:HomeComponent},
  {path:'eventos', component:EventsComponent},
  {path:'nosotros', component:NosotrosComponent},
  {path:'registro', component:RegistroComponent},
  {path:'login', component:LoginComponent}  

]


@NgModule({
    declarations: [
    HomeComponent,
    NavBarComponent,
    TitleComponent,
    CardEventsComponent,
    HeroComponent,
    EventsComponent,
    NosotrosComponent,
    RegistroComponent,
    LoginComponent, 
    FooterComponent, DashboardEventsComponent   
  ],

    imports: [
      MaterialModule,
      RouterModule.forRoot(appRoutes), 
      NgxPaginationModule,
      ReactiveFormsModule,
      FormsModule,
    ],

    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  
export class ModuloPrincipalModule { }