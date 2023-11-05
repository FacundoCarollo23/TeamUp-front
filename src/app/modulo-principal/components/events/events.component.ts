import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(){
  }

  // Variables para ocultar o mostrar las diferentes categorias
  displayActivities = false;
  displayDifficulty = false
  displayLocation = false;

  //array provisionales para mostrar actividades, categorías y ubicaciones
  activities = [
    'Futbol',
    'Running',
    'Crossfit',
    'Maraton',
    'Yoga',	
    'Skate',
    'Rollers',
    'Funcional'
  ]

  difficulties = [
    'Principiante',
    'Intermedio',
    'Avanzado',
    'Experto'
  ]

  locations = [
    'Argentina',
    'Uruguay',
    'Chile'
  ]

  ngOnInit(): void {

  }
  // Mostar u ocultar Actividades
  showActivities():void{
    this.displayActivities = true
  }
  notShowActivities():void{
    this.displayActivities = false
  }

  // Mostrar u ocultar Dificultad
  showDifficulty():void{
    this.displayDifficulty = true
  }

  notShowDifficulty():void{
    this.displayDifficulty = false
  }

    // Mostrar u ocultar Ubicación
    showLocation():void{
      this.displayLocation = true
    }
  
    notShowLocation():void{
      this.displayLocation = false
    }
}
