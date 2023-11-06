import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/api/services';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  //Esto hay que ver si hacemos al Event un model o tiene que venir como DTO desde swagger?
  eventsList : any[] = [];

  constructor(private eventService: EventService){
  }

  ngOnInit(): void {
    this.eventService.apiEventListGet().subscribe(
      (res: any)=>{
        let json = JSON.parse(res)
        this.eventsList = json.value
        console.log(this.eventsList);
      }
    )
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
