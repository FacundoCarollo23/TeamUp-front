import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventUserDto } from 'src/app/api/models';
import { EventService, EventsCommentService } from 'src/app/api/services';
import { ClimaService } from 'src/app/services/clima.service';

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
  idUserEvent : any = 0;

  //Variable usuario logueado para mostrar o no INPUT comentario y el botón me sumo
  logueado : boolean = false;

  //Variable para guardar temperatura
  temperature : any;
  iconTemperature : any;

  constructor(private eventService: EventService, private route : ActivatedRoute, private eventCommentService: EventsCommentService, private climaService : ClimaService){
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
        this.idUserEvent = this.event[0].userId
        console.log(this.idUserEvent);
        this.getClima(this.event[0].city, 'AR')

            //Llamada para recuperar los comentarios
        this.eventCommentService.apiEventsCommentListGet$Response({ userId: this.idUserEvent }).subscribe(
          (res: any)=>{
            console.log(this.idUserEvent);
            console.log(res);
            const responseBody = JSON.parse(res.body);
            console.log(responseBody);
            this.comments = responseBody.value
            
          }
        )
      }
    )
  


    // Chequear si el usuario esta o no logueado para que le muestre o no determinados componentes
    let userLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") as any)
    if(userLogueado && userLogueado.value){
      this.logueado = true
    }  else {
      this.logueado = false;
    }
  }

  //API Clima
  getClima(data : any, code : string) :void{
    this.climaService.getWeather(data, code).subscribe((res: any) => {
      console.log(res.main.temp);
      console.log(res);
      this.temperature = Math.round(res.main.temp)
      this.iconTemperature = res.weather[0].icon
      console.log(this.iconTemperature);
      
    });
  }
}
