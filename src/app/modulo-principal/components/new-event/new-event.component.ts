import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { EventUserDto } from 'src/app/api/models';
import { EventService } from 'src/app/api/services';
import { Route, Router } from '@angular/router';
import { Environment } from 'src/assets/environments/environments';
import { Observable } from 'rxjs';
import { CitiesService } from 'src/app/services/cities.service';
import * as moment from 'moment';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css'],
  encapsulation: ViewEncapsulation.None,
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
export class NewEventComponent implements OnInit, OnChanges {
  time: Date = new Date();
  formularioEvento: FormGroup;
  // timePickerConfig: Partial<BsDatepickerConfig>;
  Component: any;
  Class: any;
  eventUser: EventUserDto[] = [];

  //Variable country para almacenar el id
  country: number = 0;

  //Variable y array para almacenar el string del país y ciudades
  cities: any[] = [];
  countryCodes: any[] = [
    { id: 1, code: 'AR', name: 'Argentina' },
    { id: 2, code: 'UY', name: 'Uruguay' },
    { id: 3, code: 'CL', name: 'Chile' },
  ];

  //Variable fecha y hora
  dateTime: any;
  date: any = 'DD/MM/YYYY';
  hour: any = 'hh:mm';

  constructor(private fb: FormBuilder, private eventService: EventService, private router: Router, private citiesService: CitiesService, public snackbar: SnackBarService) {
    // Form
    this.formularioEvento = this.fb.group({
      nombreEvento: ['', [Validators.required, Validators.maxLength(50)]], // OK CHEQUEADO
      descripcionEvento: ['', [Validators.required, Validators.maxLength(1000)],], // OK CHEQUEADO
      ciudadEvento: ['', [Validators.required]], // Ya esta OK
      fechaHoraEvento: ['', [Validators.required, this.fechaNoEsHoy.bind(this)],], // Ya esta OK
      paisEvento: ['', [Validators.required]], // Ya esta OK revisado
      dificultadEvento: ['', [Validators.required]], // Ya esta OK revisado
      actividadEvento: ['', [Validators.required]], // Ya esta OK revisado
    });
    // Fecha actual
  }

  ngOnChanges(): void {}

  getCiudades(data: any): void {
    //API CIUDADES
    this.citiesService.getCities(data).subscribe((res: any) => {
      console.log(res);
      this.cities = res;
      console.log(this.cities);
    });
  }

  ngOnInit(): void {
    
    this.formularioEvento
      .get('paisEvento')
      ?.valueChanges.subscribe((data: any) => {
        console.log(data);
        this.getCiudades(data);
        this.setCountryId(data);
        // this.getCountryId()
      });

    this.formularioEvento
      .get('fechaHoraEvento')
      ?.valueChanges.subscribe((data: any) => {
        console.log(data);
        this.setDateTime(data);
        // this.getDateTime()
      });
  }

  setCountryId(countryCode: string): void {
    const country = this.countryCodes.find((c) => c.code === countryCode);
    this.country = country ? country.id : undefined;
  }

  getCountryId(): number {
    return this.country;
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
      this.formularioEvento.controls['dificultadEvento'].value as any
    ) as Number;
    let actividad: any = JSON.parse(
      this.formularioEvento.controls['actividadEvento'].value as any
    ) as Number;

    let evento: EventUserDto = {
      userId: userLogueado.value.userId as number,
      activityId: actividad,
      difficultyLevelId: dificultad,
      countryId: this.getCountryId(),
      eventName: this.formularioEvento.controls['nombreEvento'].value,
      eventDescription:
        this.formularioEvento.controls['descripcionEvento'].value,
      city: this.formularioEvento.controls['ciudadEvento'].value,
      dateTime: this.getDateTime(),
    };

    if (this.formularioEvento.valid) {
      this.eventService.apiEventCreatePost$Response({ body: evento }).subscribe(
        (respuesta: any) => {
          // Manejar la respuesta del servidor, por ejemplo, redirigir a otra página
          console.log('Evento guardado exitosamente', respuesta);
          this.router.navigate(['TeamUp/dashboardEvents']);
          this.snackbar.mensaje("Tu evento se ha generado correctamente 🙌", 3000)
        },
        (error: any) => {
          console.error('Error al guardar el evento', error);
        }
      );
    }
  }

  fechaNoEsHoy(control: any) {
    const fechaSeleccionada = moment(control.value).format('YYYY-MM-DD');
    const fechaActual = moment().format('YYYY-MM-DD');
    return fechaSeleccionada !== fechaActual ? null : { esHoy: true };
  }

  fechaActual = new Date()

}
