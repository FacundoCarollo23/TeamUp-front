import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDto } from 'src/app/api/models';
import { EventService } from 'src/app/api/services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  @Input() logueado: boolean = false
  saludo: string = "Hola"
  usuario:  any
  constructor(public route: ActivatedRoute){
    this.route.url.subscribe(urlSegments => {
      const urlPath = urlSegments.map(segment => segment.path).join('/');
      if(urlPath == "" || urlPath == "home")
      localStorage.removeItem("usuarioLogueado")
    });
   
  }

  ngOnInit(): void {
    let userLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") as any)
    console.log(userLogueado.value)
    if(userLogueado.value){
      this.logueado = true
      let usuario = userLogueado.value as UserDto
      this.usuario = "," + usuario.userName  + " " + usuario.userLastname
    }else{
      this.logueado = false
      localStorage.removeItem("usuarioLogueado")
     
    }
  }
  
}
