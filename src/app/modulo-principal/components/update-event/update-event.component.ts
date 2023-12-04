import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { EventService } from 'src/app/api/services';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css'],
})
export class UpdateEventComponent implements OnInit {
  formUpdateEvent: FormGroup;

  countryCodes: any[] = [
    { id: 1, code: 'AR', name: 'Argentina' },
    { id: 2, code: 'UY', name: 'Uruguay' },
    { id: 3, code: 'CL', name: 'Chile' },
  ];

  cities: any[] = [];

  //Variable para almacenar el ID del Evento
  idUrl: number;

  //Variable para almacenar el evento
  event: any | undefined;

  //Variable para almacenar el id del usuario del evento
  idUserEvent: any = 0;

  constructor(private fb: FormBuilder,private eventService: EventService,private route: ActivatedRoute) {
    // Almaceno en la variable idUrl, el ID del Evento que voy a  modificar
    this.idUrl = this.route.snapshot.params['id'];

    // Form
    this.formUpdateEvent = this.fb.group({
      nombreEvento: [this.event.eventName , [Validators.required, Validators.maxLength(50)]], // OK CHEQUEADO
      descripcionEvento: ['', [Validators.required, Validators.maxLength(1000)],], // OK CHEQUEADO
      ciudadEvento: ['', [Validators.required]], // Ya esta OK
      fechaHoraEvento: ['', [Validators.required, this.fechaNoEsHoy.bind(this)],], // Ya esta OK
      paisEvento: ['', [Validators.required]], // Ya esta OK revisado
      dificultadEvento: ['', [Validators.required]], // Ya esta OK revisado
      actividadEvento: ['', [Validators.required]], // Ya esta OK revisado
    });
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
        this.idUserEvent = this.event[0].userId;
        console.log(this.idUserEvent);
      }
    )
  }

  OnSubmit() {}

  fechaNoEsHoy(control: any) {
    const fechaSeleccionada = moment(control.value).format('YYYY-MM-DD');
    const fechaActual = moment().format('YYYY-MM-DD');
    return fechaSeleccionada !== fechaActual ? null : { esHoy: true };
  }
}
