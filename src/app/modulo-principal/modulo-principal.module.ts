import { NgModule } from "@angular/core";
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from "../shared/nav-bar/nav-bar.component";
import { MaterialModule } from "../material.module";
import { TitleComponent } from "../shared/title/title.component";


@NgModule({
    declarations: [
    HomeComponent,
    NavBarComponent,
    TitleComponent

  ],
    imports: [
      MaterialModule
    ],
    providers: [],

  })
  
export class ModuloPrincipalModule { }