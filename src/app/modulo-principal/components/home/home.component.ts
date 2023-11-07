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
}
