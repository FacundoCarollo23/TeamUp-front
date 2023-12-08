import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { map, switchMap } from 'rxjs';
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
  idMeBajoEvent: any
  idEvent: any
  eventosProximos: any  = []
// ------------------------------------------------- C O N S T R U C T O R -------------------------------------------------
  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router : Router,
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

        let idUrlNumber = +this.idUrl
        this.obtenerProximosEventos().subscribe((res: any)=>{
            let rta = res.flat()
            console.log(rta)
            this.idMeBajoEvent = rta.find((evento: any) => evento.eventId === idUrlNumber);
            console.log(this.idMeBajoEvent)
            this.idEvent = +this.idUrl
        })
       




      }



    
// ------------------------------------------------------ O n I n i t -------------------------------------------------------

  ngOnInit(): void {
    this.eventService
      .apiEventGetByIdIdGet$Response({ id: this.idUrl })
      .subscribe((res: any) => {
        res                                                                              //IMPRIMIR EN CONSOLA

        // Parsea el cuerpo de la respuesta JSON
        const responseBody = JSON.parse(res.body);
        
        // Asigna el objeto parseado a la propiedad event
        this.event = responseBody.value;
                                                                      //IMPRIMIR EN CONSOLA

        // Verifica si this.event tiene la estructura esperada y contiene al menos un elemento
        if (this.event && this.event.length > 0) {
          console.log('this.event[0].userId:', this.event[0].userId);                                   //IMPRIMIR EN CONSOLA
        }
        
        this.idUserEvent = this.event[0].userId;                                                                //IMPRIMIR EN CONSOLA
        this.getClima(this.event[0].city, 'AR');
        });

        
}


  
  // ------------------------------------------------- A P I   C L I M A ---------------------------------------------------
  getClima(data: any, code: string): void {
    this.climaService.getWeather(data, code).subscribe((res: any) => {                                                                               //IMPRIMIR EN CONSOLA
      this.temperature = Math.round(res.main.temp);
      this.iconTemperature = res.weather[0].icon;
      
    });
  }


// ------------------------------------------ O B T E N E R   C O M E N T A R I O S -----------------------------------------

  obtenerComentariosEventos (commentId : number) {
      //Llamada para recuperar los comentarios
      this.eventCommentService
        .apiEventsCommentListGet$Response({ eventId: commentId })
        .subscribe((res: any) => {                                                                       //IMPRIMIR EN CONSOLA
          const responseBody = JSON.parse(res.body)                                                                //IMPRIMIR EN CONSOLA
          this.comments = responseBody.value;
        });
      }

// ------------------------------------------ E N V I A R    C O M E N T A R I O S -----------------------------------------

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
      dateTime: moment(fechaComentario).format('DD/MM/YYYY hh:mm'),
    };                                                                       //IMPRIMIR EN CONSOLA

    this.eventCommentService
      .apiEventsCommentCreatePost$Response({ body: comentarioNuevo})
      .subscribe((res: any) => {                                                                //IMPRIMIR EN CONSOLA
        let json = JSON.parse(res.body) as any                                                                         //IMPRIMIR EN CONSOLA
        this.comments.push(json.value)
        this.limpiar()
      });
    }

  limpiar(){
    this.newComment.reset()
  }

  MeSumoEvento(){

    this.eventService.apiEventAddToEventEventIdUserIdPost$Response({eventId: this.idUrl , userId: this.idUsuarioLogueado}).subscribe((res:any) =>{
      res.body
      this.event[0].userCount++
      this.idMeBajoEvent = this.idUrl;
  
    })


  }

  obtenerProximosEventos(){
    return this.eventService
    .apiEventListAcceptedByUserUserIdGet$Response({ userId: this.idUsuarioLogueado })
    .pipe(
      map((res: any) => JSON.parse(res.body)),
      switchMap((responseBody: any) => {
        this.eventosProximos.push(responseBody.value);
        console.log(this.eventosProximos);
        return this.eventosProximos; 
      })
    );
  }

  MebajoEvent(){
    this.eventService.apiEventRemoveFromEventEventIdUserIdDelete$Response({eventId: this.idUrl, userId: this.idUsuarioLogueado}).subscribe((res:any)=>{
      console.log(res)
     this.event[0].userCount--
     this.idMeBajoEvent = undefined;
    })
  }



}
