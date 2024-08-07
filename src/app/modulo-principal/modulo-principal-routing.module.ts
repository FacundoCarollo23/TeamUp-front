import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { LoginGuard } from '../guards/login.guard';
import { DashboardEventsComponent } from './components/dashboard-events/dashboard-events.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { NewEventComponent } from './components/new-event/new-event.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { EventViewComponent } from './components/event-view/event-view.component';
import { UpdateEventComponent } from './components/update-event/update-event.component';
import { NoPageComponent } from './components/no-page/no-page.component';

const routes: Routes = [
    {
        path: 'TeamUp',
        component: HomeComponent,
        canActivate:[LoginGuard],
    },
    { 
        path: 'TeamUp/newevent', 
        component: NewEventComponent,
        canActivate:[LoginGuard],
    },
    { 
        path: 'TeamUp/userProfile', 
        component: UserProfileComponent,
        canActivate:[LoginGuard],
    },
    {
        path: 'TeamUp/Events',
        component: EventsComponent,
        canActivate:[LoginGuard],
    },
    {
        path: 'TeamUp/AboutUs',
        component: NosotrosComponent,
        canActivate:[LoginGuard],
    },
    {
        path: 'TeamUp/dashboardEvents',
        component: DashboardEventsComponent,
        canActivate:[LoginGuard],
    },
    {
        path: 'aboutUs',
        component: NosotrosComponent,
    },
    { 
        path: 'register', 
        component: RegistroComponent 
    },
    { 
        path: 'newevent', 
        component: NewEventComponent 
    },
    { 
        path: 'userProfile', 
        component: UserProfileComponent 
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    {
        path: 'TeamUp/Event/:id',
        component: EventViewComponent,
        canActivate: [LoginGuard]
    },
    {
        path: 'Event/:id',
        component: EventViewComponent,
    },
    {
        path: 'home/Event/:id',
        component: EventViewComponent,
    },
    { 
        path: 'TeamUp/updateEvent/:id', 
        component: UpdateEventComponent,
        canActivate:[LoginGuard],
    },
    {
        path: '**',
        component: NoPageComponent,
    },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [LoginGuard],
    exports: [RouterModule],
    
})
export class ModuloPrincipalRoutingModule {}
