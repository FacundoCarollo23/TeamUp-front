import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css'],

  animations: [
    //ANIMACION PARA FOTOS
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1500)),
    ]),

    //ANIMACION PARA TEXTO
    trigger('fade', [
     transition('void => *',[
      style({ backgroundColor: 'yellow', opacity:0 }),
      animate(3000)
     ])
    ])
  ]

})
export class NosotrosComponent {

}
