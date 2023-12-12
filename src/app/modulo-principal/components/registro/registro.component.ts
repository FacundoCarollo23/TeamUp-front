import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import { UserDto } from 'src/app/api/models';
import { UserService } from 'src/app/api/services';
import { SnackBarService } from 'src/app/services/snack-bar.service';

const fechaNacimientoValidator = (
  control: FormControl
): { [key: string]: boolean } | null => {
  const today = new Date(); // Fecha actual
  const fechaNacimiento = new Date(control.value);

  // Verificar si la fecha de nacimiento es válida y es anterior a la fecha actual
  if (!isNaN(fechaNacimiento.getTime()) && fechaNacimiento < today) {
    return null; // Fecha válida
  }

  return { fechaInvalida: true }; // Fecha no válida
};

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  [x: string]: any;
  datapickerConfig!: Partial<BsDatepickerConfig>;
  formRegistro!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _localeService: BsLocaleService,
    private userService: UserService,
    private snackbar: SnackBarService,
    private router: Router
  ) {
    this.formRegistro = this.fb.group({
      nombre: new FormControl(''),
      apellido: new FormControl('', [Validators.required]),
      alias: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [
        Validators.required,
        fechaNacimientoValidator,
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
        ),
        Validators.minLength(3)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(15),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/
        ),
      ]),
    });

    defineLocale('es', esLocale);
    this._localeService.use('es');
  }

  ngOnInit(): void {}

  OnSubmit() {
    let fechaNacimiento = moment(
      this.formRegistro.controls['fechaNacimiento'].value
    ).format('DD/MM/YYYY');
    let nuevoUsuario: UserDto = {
      userId: 0,
      userName: this.formRegistro.controls['nombre'].value,
      userLastname: this.formRegistro.controls['apellido'].value,
      dateOfBirthText: fechaNacimiento,
      email: this.formRegistro.controls['email'].value,
      password: this.formRegistro.controls['password'].value,
      alias: this.formRegistro.controls['alias'].value,
    };
    console.log(nuevoUsuario);
    if (this.formRegistro.valid) {
      this.userService
        .apiUserCreatePost$Response({ body: nuevoUsuario })
        .subscribe((res: any) => {
          console.log(res.body);
          let json = JSON.parse(res.body) as any;

          if(json.status == true){
            console.log(res.status);
            this.router.navigate(["/login"])
            this.snackbar.mensaje( "Tu Usuario se ha generado correctamente! 🙌" , 3000)
          }else{
            console.log(res.body.msg);
            console.log(res.status)
            this.snackbar.mensaje(json.msg + ' 😟', 3000)
          }
        });
    }

  }
}
