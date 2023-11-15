import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserDto } from 'src/app/api/models';
import { EventService } from 'src/app/api/services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit{
  @Input() logueado: boolean = false
  saludo: string = "Hola"
  usuario:  any
  menuOpen: boolean = false;
  constructor(public route: ActivatedRoute , public router: Router){

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
      this.usuario = ", " + usuario.userName  + " " + usuario.userLastname
    }else{
      this.logueado = false
      localStorage.removeItem("usuarioLogueado")
    }
  }

  onMenuOpened() {
    this.menuOpen = true;
  }

  onMenuClosed() {
    this.menuOpen = false;
  }

  CloseSession(){
    localStorage.removeItem("usuarioLogueado")
    this.router.navigate(['home'])
  }
  
}
