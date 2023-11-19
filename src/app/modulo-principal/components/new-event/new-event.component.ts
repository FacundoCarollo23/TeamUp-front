import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css'], encapsulation: ViewEncapsulation.None,
  
  
})
export class NewEventComponent implements OnInit{

  // name: FormControl = new FormControl('', Validators.required) ;
  // email: FormControl = new FormControl('', [Validators.email, Validators.required]);
  // phoneNumber: FormControl = new FormControl('');

  time: Date = new Date();
  formularioEvento: FormGroup;
  // timePickerConfig: Partial<BsDatepickerConfig>;
  Component: any;
  Class: any;


  constructor(private fb: FormBuilder){
    this.formularioEvento = this.fb.group ({
      nombreEvento: ['', [Validators.required]],
      descripcionEvento: ['', [Validators.required]],
      paisEvento: ['', [Validators.required]],
      ciudadEvento: ['', [Validators.required]],
      dificultadEvento: ['', [Validators.required]],
      fechaEvento: ['', [Validators.required]],
      horarioEvento: ['', [Validators.required]],
      tipoEvento: ['', [Validators.required]],
      actividadEvento: ['', [Validators.required]],
      eventDateTime: null,
    });

      
    // this.timePickerConfig = {
    //   showMeridian: true,
    //   min: new Date(),
      
    // };
  }

  ngOnInit(): void {}
  
  
  onSubmit() {
    // if (this.formularioEvento.valid) {}

    // let usuario : EventDto = {
    //   nombreEvento: this.formularioEvento.controls['nombreEvento'].value,
    // }
  }
  
  }