import { Component, Input, OnInit } from '@angular/core';
import { EventService } from 'src/app/api/services';

@Component({
  selector: 'app-card-events',
  templateUrl: './card-events.component.html',
  styleUrls: ['./card-events.component.css']
})
export class CardEventsComponent implements OnInit {
  events: any = []
  @Input() event: any;

constructor(public eventService: EventService){}
  ngOnInit(): void {
    this.eventService.apiEventListGet$Response().subscribe((res:any)=>{
      res
    })
  }

}
