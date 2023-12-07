import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { EventUserDto, EventsCommentDto } from 'src/app/api/models';
import { EventService, EventsCommentService } from 'src/app/api/services';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css'],
})
export class EventViewComponent implements OnInit {

  //Variable para almacenar el ID del Evento
  idUrl: number;

  //Variable para almacenar el evento
  event: any | undefined;

  //Array para almacenar los comentarios
  comments: any = [];

  // Variable para almacenar el nuevo comentrio antes de enviarlo a la base de datos
  newComment!:FormGroup;
  

  //Variable para almacenar el id del usuario del evento
  idUserEvent: any = 0;

  //Variable usuario logueado para mostrar o no INPUT comentario y el botón me sumo
  logueado: boolean = false;

  //Variable para guardar temperatura
  temperature: any;
  iconTemperature: any;

  // Variable para que si el usuario es el creador del evento NO MUESTRE "me sumo"
  showMeSumo : boolean=false;
  idUsuarioLogueado : any;


  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private eventCommentService: EventsCommentService,
    private climaService: ClimaService,
    private fb : FormBuilder,
    

  ) {
    this.idUrl = this.route.snapshot.params['id'];
    this.obtenerComentariosEventos(this.idUrl);
    this.newComment=this.fb.group({
      newComment : new FormControl(''),
    })

    // Chequear si el usuario esta o no logueado para que le muestre o no determinados componentes
    let userLogueado = JSON.parse(
      localStorage.getItem('usuarioLogueado') as any
    );
    if (userLogueado && userLogueado.value) {
      this.logueado = true;
      this.idUsuarioLogueado = userLogueado.value.userId; 
    } else {
      this.logueado = false;
    }




  }

  ngOnInit(): void {
    this.eventService
      .apiEventGetByIdIdGet$Response({ id: this.idUrl })
      .subscribe((res: any) => {
        console.log(res);
        // Parsea el cuerpo de la respuesta JSON
        const responseBody = JSON.parse(res.body);
        

        // Asigna el objeto parseado a la propiedad event
        this.event = responseBody.value;
        console.log(this.event);

        // Verifica si this.event tiene la estructura esperada y contiene al menos un elemento
        if (this.event && this.event.length > 0) {
          console.log('this.event[0].userId:', this.event[0].userId);} // Agrega esta línea para imprimir en la consola
        
          this.idUserEvent = this.event[0].userId;
        console.log(this.idUserEvent);
        this.getClima(this.event[0].city, 'AR');
        });


  






    
    // if (userLogueado.value.id == this.idUserEvent) {
    //   this.showMeSumo = true;
    //   console.log(userLogueado.value[2])
    // }
    // else {
    //   this.showMeSumo = false;
    //   console.log(userLogueado.value[2])
    // }
  }


  
  
  
  //API Clima
  getClima(data: any, code: string): void {
    this.climaService.getWeather(data, code).subscribe((res: any) => {
      console.log(res.main.temp);
      console.log(res);
      this.temperature = Math.round(res.main.temp);
      this.iconTemperature = res.weather[0].icon;
      console.log(this.iconTemperature);
    });
  }

  obtenerComentariosEventos (commentId : number) {
      //Llamada para recuperar los comentarios
      this.eventCommentService
        .apiEventsCommentListGet$Response({ eventId: commentId })
        .subscribe((res: any) => {
          console.log(this.idUserEvent);
          console.log(res);
          const responseBody = JSON.parse(res.body);
          console.log(responseBody);
          this.comments = responseBody.value;
        });
      }


enviarComentario() {
  let userLogueado = JSON.parse(
    localStorage.getItem('usuarioLogueado') as any
  );
  let userIdName = userLogueado.value
  let fechaComentario : any = new Date()
  let comentarioNuevo : EventsCommentDto = {
    eventId: this.idUrl,
    eventName: this.event[0].eventName,
    userId: this.idUsuarioLogueado,
    userIdName: userIdName.userName, 
    comment: this.newComment.controls['newComment'].value,
    dateTime: moment(fechaComentario).format('DD/MM/YYYY HH:MM'),
  };
  console.log(comentarioNuevo)

  this.eventCommentService
    .apiEventsCommentCreatePost$Response({ body: comentarioNuevo})
    .subscribe((res: any) => {
      console.log(res);
  let json = JSON.parse(res.body) as any
 
      console.log(json)
      this.comments.push(json.value)
      this.limpiar()
    });
}

limpiar(){
  this.newComment.reset()
}


}

