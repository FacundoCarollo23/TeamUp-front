import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from 'src/app/api/services';
import { MatDialog } from '@angular/material/dialog';
import {Sort, MatSortModule} from '@angular/material/sort';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard-events',
  templateUrl: './dashboard-events.component.html',
  styleUrls: ['./dashboard-events.component.css'],
})
export class DashboardEventsComponent implements OnInit {
  userEventsList: any[] = [];
  pageUserEvents: number = 1;
  pageUserJoinedEvents: number = 1;
  userJoinedEventsList: any[] = [];
  userLogueado: any = 0;

  //ordenamiento Eventos creados por mí  
  sortData(sort: Sort) {
    const data = this.userEventsList.slice();
    if (!sort.active || sort.direction === '') {
      this.userEventsList = data;
      return;
    }

    this.userEventsList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'dateTime':
          return compare(a.dateTime, b.dateTime, isAsc);
        default:
          return 0;
      }
    });
    console.log(this.userEventsList);
  }

  //ordenamiento Mis próximos eventos
  sortDataNextEvents(sort: Sort) {
    const data = this.userJoinedEventsList.slice();
    if (!sort.active || sort.direction === '') {
      this.userJoinedEventsList = data;
      return;
    }

    this.userJoinedEventsList = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'dateTime':
          return compare(a.dateTime, b.dateTime, isAsc);
        default:
          return 0;
      }
    });
  }

  constructor(private eventService: EventService, private dialog: MatDialog, private snackbar: SnackBarService) {
    this.userEventsList = this.userEventsList.slice();
    this.userJoinedEventsList = this.userEventsList.slice();
  }

  ngOnInit(): void {
    //Obtengo y guardo el Id del usuario Logueado para filtrar por el mismo
    this.userLogueado = JSON.parse(
      localStorage.getItem('usuarioLogueado') as any
    );
    this.userLogueado = this.userLogueado.value.userId as number;

    // Endpoint GET Eventos del Usuario LOGUEADO
    this.eventService
      .apiEventListCreatedByUserUserIdGet$Response({
        userId: this.userLogueado,
      })
      .subscribe((res: any) => {
        // Parsea el cuerpo de la respuesta JSON
        const responseBody = JSON.parse(res.body);

        // Asigna el objeto parseado a la propiedad event
        console.log(responseBody);
        this.userEventsList = responseBody.value;

        // Ordena la lista por fecha
        this.userEventsList = this.sortByDateTime(this.userEventsList)
      });

    // Endpoint GET Eventos a los que se sumo el usuario LOGUEADO
    this.eventService
      .apiEventListAcceptedByUserUserIdGet$Response({
        userId: this.userLogueado,
      })
      .subscribe((res: any) => {
        // Parsea el cuerpo de la respuesta JSON
        const responseBody = JSON.parse(res.body);

        // Asigna el objeto parseado a la propiedad event
        console.log(responseBody);
        this.userJoinedEventsList = responseBody.value;

         // Ordena la lista por fecha
      this.userJoinedEventsList = this.sortByDateTime(this.userJoinedEventsList);
      });
  }

  sortByDateTime(eventsList: any[]): any[] {
    return eventsList.sort((a, b) => {
      const dateA = new Date(moment(a.dateTime, 'DD/MM/YYYY HH:mm').toDate());
      const dateB = new Date(moment(b.dateTime, 'DD/MM/YYYY HH:mm').toDate());
  
      return dateA.getTime() - dateB.getTime();
    });
  }

  eventToDelete: any; // Variable para rastrear el evento que se eliminará

  deleteEvent(id: number) {
    console.log(id);

    // Encuentra el evento correspondiente al ID
    this.eventToDelete = this.userEventsList.find(
      (event) => event.eventId === id
      );
    console.log(this.eventToDelete);
  }

  confirmDelete() {
    console.log(this.eventToDelete);

    this.eventService
      .apiEventDeleteIdDelete$Response({ id: this.eventToDelete.eventId })
      .subscribe((a) => {
        this.getEvents();
        this.eventsAcceptedByUsers();
      });
      this.snackbar.mensaje("Tu evento se ha eliminado 😭", 3000)
  }

  getEvents() {
    // Endpoint GET Eventos del Usuario LOGUEADO
    this.eventService
      .apiEventListCreatedByUserUserIdGet$Response({
        userId: this.userLogueado,
      })
      .subscribe((res: any) => {
        // Parsea el cuerpo de la respuesta JSON
        const responseBody = JSON.parse(res.body);

        // Asigna el objeto parseado a la propiedad event
        console.log(responseBody);
        this.userEventsList = responseBody.value;
      });
  }

  eventsAcceptedByUsers(){
    this.eventService
    .apiEventListAcceptedByUserUserIdGet$Response({
      userId: this.userLogueado,
    })
    .subscribe((res: any) => {
      // Parsea el cuerpo de la respuesta JSON
      const responseBody = JSON.parse(res.body);

      // Asigna el objeto parseado a la propiedad event
      console.log(responseBody);
      this.userJoinedEventsList = responseBody.value;

       // Ordena la lista por fecha
    this.userJoinedEventsList = this.sortByDateTime(this.userJoinedEventsList);
    });
  }


  isUserCreatedEvent(event: any): boolean {
    return this.userEventsList.some(userEvent => userEvent.eventId === event.eventId);

  }

  MebajoEvent(eventId : any){
    this.eventService.apiEventRemoveFromEventEventIdUserIdDelete$Response({eventId: eventId,  userId: this.userLogueado}).subscribe((res:any)=>{
    console.log(res)
    this.userJoinedEventsList = this.userJoinedEventsList.filter((evento: any) => evento.eventId !== eventId)
    this.snackbar.mensaje("Te diste de baja del evento 😭", 3000)
    })
  }

}

function compare(a: string, b: string, isAsc: boolean) {
  const dateA = new Date(moment(a, 'DD/MM/YYYY HH:mm').toDate());
  const dateB = new Date(moment(b, 'DD/MM/YYYY HH:mm').toDate());

  return (dateA < dateB ? -1 : 1) * (isAsc ? 1 : -1);
}

