import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {

  @Input() title: string = "";
  @Input() subtitle: string = "";
  @Input() fontWeightTitle: string = ""
  @Input() fontWeightSubtitle: string = ""
  @Input() fontSizeTitle : string = ""
  @Input() fontSizeSubtitle : string = ""
  @Input() colorTitle : string = ""
  @Input() colorSubtitle : string = ""
  constructor(){
  }

  ngOnInit(): void {
    
  }

}
