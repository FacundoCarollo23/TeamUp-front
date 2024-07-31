import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],

  animations: [
    //ANIMACION PARA TEXTOS
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1500)),
    ]),
  ]

})
export class HeroComponent implements OnInit{   
  logueado : boolean = false;

  constructor(){}
  ngOnInit(): void {
    let userLogueado = JSON.parse(localStorage.getItem("usuarioLogueado") as any)
    if(userLogueado && userLogueado.value){
      this.logueado = true
    }
  }
}