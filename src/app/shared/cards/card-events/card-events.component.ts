import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { EventService } from 'src/app/api/services';

@Component({
  selector: 'app-card-events',
  templateUrl: './card-events.component.html',
  styleUrls: ['./card-events.component.css']
})
export class CardEventsComponent implements OnInit, OnChanges {
  events: any = []
  @Input() event: any;
  logueado : boolean = false;

constructor(public eventService: EventService){}
  ngOnInit(): void {
    this.eventService.apiEventListGet$Response().subscribe((res:any)=>{
      res
    })
  }

  ngOnChanges(){
    let userLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") as any)
    if(userLogueado && userLogueado.value){
      this.logueado = true
    }  else {
      this.logueado = false;
    }
  }
}
