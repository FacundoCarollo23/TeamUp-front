import { NgModule } from "@angular/core";
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from "../shared/nav-bar/nav-bar.component";
import { MaterialModule } from "../material.module";
import { TitleComponent } from "../shared/title/title.component";
import { CardEventsComponent } from "../shared/cards/card-events/card-events.component";
import { HeroComponent } from "../shared/hero/hero.component";
import { EventsComponent } from './events/events.component';



@NgModule({
    declarations: [
    HomeComponent,
    NavBarComponent,
    TitleComponent,
    CardEventsComponent,
    HeroComponent,
    EventsComponent,

  ],
    imports: [
      MaterialModule
    ],
    providers: [],

  })
  
export class ModuloPrincipalModule { }