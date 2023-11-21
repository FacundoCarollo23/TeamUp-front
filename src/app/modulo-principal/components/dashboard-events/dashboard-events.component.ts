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
  public page!: number;

  constructor(private eventService: EventService, private dialog: MatDialog){
  }

  ngOnInit(): void {
    let userLogueado = JSON.parse(
      localStorage.getItem('usuarioLogueado') as any
    );

    userLogueado = userLogueado.value.userId as number

    console.log(userLogueado);
    

    // this.eventService.().subscribe(
    //   (res: any)=>{
    //     let json = JSON.parse(res)
    //     this.userEventsList = json.value
    //     console.log(this.userEventsList);
    //   }
    // )
  }

  eventToDelete: any; // Variable para rastrear el evento que se eliminará

  deleteEvent(id: number) {
    console.log(id);
    
    // Encuentra el evento correspondiente al ID
    this.eventToDelete = this.userEventsList.find(event => event.eventId === id);
    console.log(this.eventToDelete);
    
  }

  confirmDelete() {
    console.log(this.eventToDelete);
    
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
