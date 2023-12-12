import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { EventUserDto } from 'src/app/api/models';
import { EventService } from 'src/app/api/services';
import { CitiesService } from 'src/app/services/cities.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

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

  //Variable country para almacenar el id
  country: number = 0;

  countryCodes: any[] = [
    { id: 1, code: 'AR', name: 'Argentina' },
    { id: 2, code: 'UY', name: 'Uruguay' },
    { id: 3, code: 'CL', name: 'Chile' },
  ];

  //Variable fecha y hora
  dateTime: any;
  date: any = 'DD/MM/YYYY';
  hour: any = 'hh:mm';

  cities: any[] = [];

  //Variable para almacenar el ID del Evento
  idUrl: number;

  //Variable para almacenar el evento
  event: any | undefined;

  //Variable para almacenar el id del usuario del evento
  idUserEvent: any = 0;

  //PRUEBA MAT_SELECT
  originalPais: any;
  originalCiudad: any;
  originalDificultad: any;
  originalActividad: any;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    private citiesService: CitiesService,
    private router: Router,
    public snackbar: SnackBarService
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

        //Seteo los valores en el Form
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
          this.event[0].city
        );
        this.formUpdateEvent.get('ciudadEvento')?.updateValueAndValidity();

        // Asigna el valor de la etiqueta CIUDAD
        this.formUpdateEvent.get('ciudadEvento')?.setValue(this.event[0].city);
        this.formUpdateEvent.get('ciudadEvento')?.updateValueAndValidity();

        // Asigna el DIFICULTAD del evento directamente a la etiqueta
        this.formUpdateEvent.controls['dificultadEvento'].setValue(
          this.event[0].difficultyName
        );
        this.formUpdateEvent.get('dificultadEvento')?.updateValueAndValidity();

        // Asigna el valor de la etiqueta DIFICULTAD
        this.formUpdateEvent
          .get('dificultadEvento')
          ?.setValue(this.event[0].difficultyName);
        this.formUpdateEvent.get('dificultadEvento')?.updateValueAndValidity();

        // Asigna el ACTIVIDAD del evento directamente a la etiqueta
        this.formUpdateEvent.controls['actividadEvento'].setValue(
          this.event[0].activityName
        );
        this.formUpdateEvent.get('actividadEvento')?.updateValueAndValidity();

        // Asigna el valor de la etiqueta ACTIVIDAD
        this.formUpdateEvent
          .get('actividadEvento')
          ?.setValue(this.event[0].activityName);
        this.formUpdateEvent.get('actividadEvento')?.updateValueAndValidity();
      });

    this.formUpdateEvent
      .get('paisEvento')
      ?.valueChanges.subscribe((data: any) => {
        console.log(data);
        this.getCiudades(data);
        this.setCountryId(data);
      });

    this.formUpdateEvent
      .get('fechaHoraEvento')
      ?.valueChanges.subscribe((selectedCountry: any) => {
        console.log(selectedCountry);
        this.getCiudades(selectedCountry);
        this.setCountryId(selectedCountry);
      });
  }

  setCountryId(selectedCountry: any): void {
    this.country = selectedCountry.id;
  }

  getCountryId(): number {
    return this.country;
  }

  getCiudades(data: any): void {
    //API CIUDADES
    data = 'AR';
    this.citiesService.getCities(data).subscribe((res: any) => {
      console.log(res);
      this.cities = res;
      console.log(this.cities);
    });
  }

  setDateTime(data: any) {
    this.date = moment(data).format('DD/MM/YYYY');
    this.hour = moment(data).format(' HH:mm');
    this.dateTime = this.date + this.hour;
    console.log(this.date);
    console.log(this.hour);
    console.log(this.dateTime);
  }

  getDateTime() {
    return this.dateTime;
  }

  OnSubmit() {
    let userLogueado = JSON.parse(
      localStorage.getItem('usuarioLogueado') as any
    );

    let dificultad: any = JSON.parse(
      this.formUpdateEvent.controls['dificultadEvento'].value as any
    ) as Number;
    let actividad: any = JSON.parse(
      this.formUpdateEvent.controls['actividadEvento'].value as any
    ) as Number;

    let evento: EventUserDto = {
      eventId: this.idUrl,
      userId: userLogueado.value.userId as number,
      activityId: actividad,
      city: this.formUpdateEvent.controls['ciudadEvento'].value,
      difficultyLevelId: dificultad,
      countryId: this.getCountryId(),
      eventName: this.formUpdateEvent.controls['nombreEvento'].value,
      eventDescription:
        this.formUpdateEvent.controls['descripcionEvento'].value,
      dateTime: this.getDateTime(),
    };

    if (this.formUpdateEvent.valid) {
      this.eventService.apiEventEditPut$Response({ body: evento }).subscribe(
        (respuesta: any) => {
          // Manejar la respuesta del servidor, por ejemplo, redirigir a otra página
          console.log('Evento modificado exitosamente', respuesta);
          this.router.navigate(['TeamUp/dashboardEvents']);
          this.snackbar.mensaje(
            'Tu evento se ha modificado correctamente 🙌',
            3000
          );
        },
        (error: any) => {
          console.error('Error al modificar el evento', error);
        }
      );
    }
  }

  fechaNoEsHoy(control: any) {
    const fechaSeleccionada = moment(control.value).format('YYYY-MM-DD');
    const fechaActual = moment().format('YYYY-MM-DD');
    return fechaSeleccionada !== fechaActual ? null : { esHoy: true };
  }

  fechaActual = new Date();
}
