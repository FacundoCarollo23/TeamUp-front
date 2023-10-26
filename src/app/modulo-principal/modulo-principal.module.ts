import { NgModule } from "@angular/core";
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from "../shared/nav-bar/nav-bar.component";
import { MaterialModule } from "../material.module";
import { TitleComponent } from "../shared/title/title.component";
import { HeroComponent } from "../shared/hero/hero.component";


@NgModule({
    declarations: [
    HomeComponent,
    NavBarComponent,
    TitleComponent,
    HeroComponent
  ],
    imports: [
      MaterialModule
    ],
    providers: [],

  })
  
export class ModuloPrincipalModule { }