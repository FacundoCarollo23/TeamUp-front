import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/api/services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  events: any [] = []
  constructor(private eventService: EventService){}

  ngOnInit(): void {
    
  }
  
}
