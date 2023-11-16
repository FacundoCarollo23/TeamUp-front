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
  formBuilder: any;

  constructor(private fb: FormBuilder) {
    this.formularioPerfil = this.fb.group({
      nivelEntrenamiento: ['', Validators.required],
      actividades: this.fb.array([]),
    });
  }
  
  ngOnInit() { }
}