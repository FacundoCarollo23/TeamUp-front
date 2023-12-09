import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from 'src/app/api/services';
import { MatDialog } from '@angular/material/dialog';
import {Sort, MatSortModule} from '@angular/material/sort';

@Component({
  selector: 'app-dashboard-events',
  templateUrl: './dashboard-events.component.html',
  styleUrls: ['./dashboard-events.component.css'],
})
export class DashboardEventsComponent implements OnInit {
  userEventsList: any[] = [];
  public page!: number;
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
        case 'fecha':
          return compare(a.fecha, b.fecha, isAsc);
        default:
          return 0;
      }
    });
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
        case 'fecha':
          return compare(a.fecha, b.fecha, isAsc);
        default:
          return 0;
      }
    });
  }

  constructor(private eventService: EventService, private dialog: MatDialog) {
    this.userEventsList = this.userEventsList.slice();
    this.userJoinedEventsList = this.userEventsList.slice();
  }

  ngOnInit(): void {
    //Obtengo y guardo el Id del usuario Logueado para filtrar por el mismo
    this.userLogueado = JSON.parse(
      localStorage.getItem('usuarioLogueado') as any
    );
    this.userLogueado = this.userLogueado.value.userId as number;
    console.log(this.userLogueado);

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
      });
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


  isUserCreatedEvent(event: any): boolean {
    return this.userEventsList.some(userEvent => userEvent.eventId === event.eventId);

  }

  MebajoEvent(eventId : any){
    this.eventService.apiEventRemoveFromEventEventIdUserIdDelete$Response({eventId: eventId,  userId: this.userLogueado}).subscribe((res:any)=>{
    console.log(res)
    this.userJoinedEventsList = this.userJoinedEventsList.filter((evento: any) => evento.eventId !== eventId)
    })
  }

}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

