import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/api/services';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private userService: UserService){
  }
  ngOnInit(): void {
    this.userService.apiUserListGet().subscribe((res: any)=>{
      
    })
  }
}
