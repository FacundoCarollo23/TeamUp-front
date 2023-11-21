import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventUserDto } from 'src/app/api/models';
import { EventService, EventsCommentService } from 'src/app/api/services';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})

export class EventViewComponent implements OnInit{
  //Variable para almacenar el ID
  idUrl : number;

  //Variable para almacenar el evento
  event : any | undefined;

  //Array para almacenar los comentarios
  comments : any = []

  //Variable para almacenar el id del usuario del evento
  idUserEvent : any | undefined;

  constructor(private eventService: EventService, private route : ActivatedRoute, private eventCommentService: EventsCommentService){
    this.idUrl = this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.eventService.apiEventGetByIdIdGet$Response({ id : this.idUrl }).subscribe(
      (res: any)=>{
        console.log(res);
        // Parsea el cuerpo de la respuesta JSON
        const responseBody = JSON.parse(res.body);

        // Asigna el objeto parseado a la propiedad event
        this.event = responseBody.value;
        console.log(this.event);
        this.idUserEvent = this.event.userId
        console.log(this.idUserEvent);
      }
    )
  
    //Llamada para recuperar los comentarios
    this.eventCommentService.apiEventsCommentListGet({ userId: this.idUserEvent }).subscribe(
      (res: any)=>{
        console.log(this.idUserEvent);
        
        let json = JSON.parse(res)
        this.comments = json.value
        console.log(this.comments);
      }
    )
    
  }
}
