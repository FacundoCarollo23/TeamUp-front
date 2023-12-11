import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { EventService } from 'src/app/api/services';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css'],
  animations: [
    //ANIMACION PARA DESPLEGABLES
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition('void <=> *', animate(1500)),
    ]),

    //ANIMACION PARA BOTONES
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: 'yellow', opacity: 0 }),
        animate(3000),
      ]),
    ]),

    trigger('fade2', [
      transition('void => *', [
        style({ backgroundColor: 'white', opacity: 0 }),
        animate(3000),
      ]),
    ]),
  ],
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

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private citiesService: CitiesService
  ) {
    // Almaceno en la variable idUrl, el ID del Evento que voy a  modificar
    this.idUrl = this.route.snapshot.params['id'];

    // Form
    this.formUpdateEvent = this.fb.group({
      nombreEvento: ['', [Validators.required, Validators.maxLength(50)]],
      descripcionEvento: [
        '',
        [Validators.required, Validators.maxLength(1000)],
      ],
      paisEvento: ['', [Validators.required]],
      ciudadEvento: ['', [Validators.required]],
      fechaHoraEvento: [
        '',
        [Validators.required, this.fechaNoEsHoy.bind(this)],
      ],
      dificultadEvento: ['', [Validators.required]],
      actividadEvento: ['', [Validators.required]],
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
        this.formUpdateEvent.controls['nombreEvento'].setValue(
          this.event[0].eventName
        );
        this.formUpdateEvent.controls['descripcionEvento'].setValue(
          this.event[0].eventDescription
        );
        this.formUpdateEvent.controls['fechaHoraEvento'].setValue(
          this.event[0].dateTime
        );

        // Asigna el país del evento directamente a la etiqueta
        this.formUpdateEvent.controls['paisEvento'].setValue(
          this.event[0].countryName
        );
        this.formUpdateEvent.get('paisEvento')?.updateValueAndValidity();

        // Asigna el valor de la etiqueta
        this.formUpdateEvent
          .get('paisEvento')
          ?.setValue(this.event[0].countryName);
        this.formUpdateEvent.get('paisEvento')?.updateValueAndValidity();

        // Asigna el CIUDAD del evento directamente a la etiqueta
        this.formUpdateEvent.controls['ciudadEvento'].setValue(
          this.event[0].countryName
        );
        this.formUpdateEvent.get('ciudadEvento')?.updateValueAndValidity();

        // Asigna el valor de la etiqueta CIUDAD
        this.formUpdateEvent
          .get('ciudadEvento')
          ?.setValue(this.event[0].countryName);
        this.formUpdateEvent.get('ciudadEvento')?.updateValueAndValidity();

        // Asigna el DIFICULTAD del evento directamente a la etiqueta
        this.formUpdateEvent.controls['dificultadEvento'].setValue(
          this.event[0].countryName
        );
        this.formUpdateEvent.get('dificultadEvento')?.updateValueAndValidity();

        // Asigna el valor de la etiqueta DIFICULTAD
        this.formUpdateEvent
          .get('dificultadEvento')
          ?.setValue(this.event[0].countryName);
        this.formUpdateEvent.get('dificultadEvento')?.updateValueAndValidity();

        // Asigna el ACTIVIDAD del evento directamente a la etiqueta
        this.formUpdateEvent.controls['actividadEvento'].setValue(
          this.event[0].countryName
        );
        this.formUpdateEvent.get('actividadEvento')?.updateValueAndValidity();

        // Asigna el valor de la etiqueta ACTIVIDAD
        this.formUpdateEvent
          .get('actividadEvento')
          ?.setValue(this.event[0].countryName);
        this.formUpdateEvent.get('actividadEvento')?.updateValueAndValidity();
      });
  }

  getCiudades(data: any): void {
    //API CIUDADES
    this.citiesService.getCities(data).subscribe((res: any) => {
      console.log(res);
      this.cities = res;
      console.log(this.cities);
    });
  }

  OnSubmit() {}

  fechaNoEsHoy(control: any) {
    const fechaSeleccionada = moment(control.value).format('YYYY-MM-DD');
    const fechaActual = moment().format('YYYY-MM-DD');
    return fechaSeleccionada !== fechaActual ? null : { esHoy: true };
  }

  fechaActual = new Date();
}
