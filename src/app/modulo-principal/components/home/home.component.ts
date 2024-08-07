import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/api/services';
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] 
})
export class HomeComponent implements OnInit {
  //Eventos RECIENTES
  recentEventsList : any[] = [];

  //Eventos DESTACADOS
  highlightedEventsList : any[] = [];

  constructor(private eventService: EventService){
  }
  ngOnInit(): void {

    //Slider Eventos RECIENTES
    this.eventService.apiEventListRecentGet().subscribe(
      (res: any)=>{
        let json = JSON.parse(res)
        this.recentEventsList = json.value
      }
    )

    //Slider Eventos DESTACADOS
    this.eventService.apiEventListFeaturedGet().subscribe(
      (res: any)=>{
        let json = JSON.parse(res)
        this.highlightedEventsList = json.value
      }
    )
  }
}