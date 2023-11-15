import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { EventsComponent } from "./components/events/events.component";
import { LoginGuard } from "../guards/login.guard";
import { DashboardEventsComponent } from "./components/dashboard-events/dashboard-events.component";
import { NosotrosComponent } from "./components/nosotros/nosotros.component";


const routes : Routes = [
    {
    path: "" , pathMatch: "full", component: HomeComponent  
    },
    {
        path: "home", component: HomeComponent  
    },
    {
        path: "events", component: EventsComponent
    },
    {
        path: "Home", component: HomeComponent  
    },
    {
        path: "dashboardEvents", component: DashboardEventsComponent
    },
    {
        path: "aboutUs", component: NosotrosComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class ModuloPrincipalRoutingModule {}