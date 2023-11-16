import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/api/services';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-events',
  templateUrl: './dashboard-events.component.html',
  styleUrls: ['./dashboard-events.component.css']
})
export class DashboardEventsComponent implements OnInit{
  userEventsList : any[] = [];

  constructor(private eventService: EventService, private dialog: MatDialog){
  }

  ngOnInit(): void {
    this.eventService.apiEventListGet().subscribe(
      (res: any)=>{
        let json = JSON.parse(res)
        this.userEventsList = json.value
        console.log(this.userEventsList);
      }
    )
  }

  // deleteEvent(id: number){
  //     this.eventService.apiEventDeleteIdDelete$Response({ id }).subscribe()
  //     this.eventService.apiEventListGet().subscribe()
  // }

  eventToDelete: any; // Variable para rastrear el evento que se eliminará

  deleteEvent(id: number) {
    // Encuentra el evento correspondiente al ID
    this.eventToDelete = this.userEventsList.find(event => event.eventId === id);
  }

  confirmDelete() {
    this.eventService.apiEventDeleteIdDelete$Response({ id: this.eventToDelete.eventId }).subscribe(
      a => {
        this.getEvents()
      }
    );
  }

  getEvents(){
    this.eventService.apiEventListGet().subscribe(
      (res: any)=>{
        let json = JSON.parse(res)
        this.userEventsList = json.value
        console.log(this.userEventsList);
      }
    )
  }


}
