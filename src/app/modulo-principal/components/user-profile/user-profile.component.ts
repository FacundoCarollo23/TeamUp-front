import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  formularioPerfil: FormGroup;


  actividades = ['Futbol', 'Padel', 'Patinaje', 'Rugby', 'Ciclismo', 'Quidditch', 'Hockey', 'Running', 'Rafting', 'Basket', 'Senderismo', 'Escalada', 'Voley', 'Fitness', 'Yoga'];
  // formBuilder: any;   segun gpt está de mas, lo defino dos veces

  constructor(private fb: FormBuilder) {
    this.formularioPerfil = this.fb.group({
      nivelEntrenamiento: new FormControl (''),
      actividades: new FormControl (),
    });
  }
  
  ngOnInit() { }
}