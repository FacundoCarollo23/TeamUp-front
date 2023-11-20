import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { EventUserDto } from 'src/app/api/models';
import { EventService } from 'src/app/api/services';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css'], encapsulation: ViewEncapsulation.None,
  
})


export class NewEventComponent implements OnInit{

  time: Date = new Date();
  formularioEvento: FormGroup;
  // timePickerConfig: Partial<BsDatepickerConfig>;
  Component: any;
  Class: any;
  eventUser: EventUserDto [] = []


  constructor(private fb: FormBuilder, private eventService: EventService, private router: Router){
    this.formularioEvento = this.fb.group ({
      nombreEvento: ['', [Validators.required]],
      descripcionEvento: ['', [Validators.required]],
      paisEvento: ['', [Validators.required]],
      ciudadEvento: ['', [Validators.required]],
      dificultadEvento: ['', [Validators.required]],
      fechaEvento: ['', [Validators.required]],  //DUDA SOBRE FORMATO DE FECHA Y HORA, PORQUE ES UN DATETIME, Y ACA DOS SEPARADOS O UNO JUNTO?
      horarioEvento: ['', [Validators.required]],
      tipoEvento: ['', [Validators.required]],
      actividadEvento: ['', [Validators.required]],
      // eventDateTime: null,
    });

      
    // this.timePickerConfig = {
    //   showMeridian: true,
    //   min: new Date(),
      
    // };
  }

  ngOnInit(): void {}
  
  
  onSubmit() {
    if (this.formularioEvento.valid) {

      /*
      const fechaEvento: string = this.formularioEvento.controls['fechaEvento'].value;
      const horarioEvento: string = this.formularioEvento.controls['horarioEvento'].value;

      COMBINA LA FECHA Y LA HORA EN UN SOLO CAMPO ANTES DE ENVIARLO AL BACKEND
      const dateTime: string = fechaEvento + ' ' + horarioEvento;
      
      */
      const usuarioLogueado = localStorage.getItem("usuarioLogueado");
      if (usuarioLogueado) {
        const usuario = JSON.parse(usuarioLogueado);

      let evento: EventUserDto = {
        userId: usuario.id, // NO SE COMO ENGANCHARLO CON EL USUARIO QUE YA ESTÁ LOGUEADO
        // eventId: null, // DEBERÍA PONER ALGO QUE ME GENERE UN ID AUTOMÁTICAMENTE, O NO?
        activityId: this.formularioEvento.controls['actividadEvento'].value,
        difficultyLevelId: this.formularioEvento.controls['dificultadEvento'].value,
        countryId: this.formularioEvento.controls['paisEvento'].value,
        eventName: this.formularioEvento.controls['nombreEvento'].value,
        eventDescription: this.formularioEvento.controls['descripcionEvento'].value,
        city: this.formularioEvento.controls['ciudadEvento'].value,
        dateTime: this.formularioEvento.controls['fechaEvento'].value + ' ' + this.formularioEvento.controls['horarioEvento'].value,
        // dateTime: dateTime, // Aquí asignamos la fecha y hora combinadas
      };
    
      this.eventService.guardarEvento(evento).subscribe(
        (respuesta: any) => {
          // Manejar la respuesta del servidor, por ejemplo, redirigir a otra página
          console.log('Evento guardado exitosamente', respuesta);
          this.router.navigate(['Home']);
        },
        (error: any) => {
          console.error('Error al guardar el evento', error);
        }
      );}
    }
  }
}