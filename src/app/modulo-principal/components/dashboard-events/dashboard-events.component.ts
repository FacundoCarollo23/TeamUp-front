import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/api/services';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private eventService: EventService, private dialog: MatDialog) {}

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
    this.eventService.apiEventListCreatedByUserUserIdGet$Response({
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
}
