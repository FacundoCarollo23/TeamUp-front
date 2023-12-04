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
import { NgxPaginationModule } from 'ngx-pagination';
import { NewEventComponent } from './components/new-event/new-event.component'; // Paginación
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRadioGroup, MatRadioModule  } from "@angular/material/radio"
import { DashboardEventsComponent } from './components/dashboard-events/dashboard-events.component';
import { EventViewComponent } from './components/event-view/event-view.component';
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UpdateEventComponent } from './components/update-event/update-event.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NoPageComponent } from './components/no-page/no-page.component';


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
    FooterComponent, 
    NewEventComponent, 
    UserProfileComponent,
    DashboardEventsComponent,
    EventViewComponent,
    UpdateEventComponent,
    NoPageComponent   
  ],

    imports: [
      BsDatepickerModule.forRoot(),
      MaterialModule,
      RouterModule, 
      NgxPaginationModule,
      ReactiveFormsModule,
      FormsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatInputModule,
      DateTimePickerModule,
      MatCheckboxModule,
      MatRadioModule,
      BrowserModule,
      BrowserAnimationsModule,
    
    ],

    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  
export class ModuloPrincipalModule { }