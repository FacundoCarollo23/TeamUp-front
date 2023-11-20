import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit{   
  logueado : boolean = false;

  constructor(){}
  ngOnInit(): void {
    let userLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") as any)
    if(userLogueado.value){
      this.logueado = true
    }
  }
}