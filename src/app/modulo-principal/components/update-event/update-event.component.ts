import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  formularioEvento: FormGroup;

  countryCodes: any[] = [
    { id: 1, code: 'AR', name: 'Argentina' },
    { id: 2, code: 'UY', name: 'Uruguay' },
    { id: 3, code: 'CL', name: 'Chile' },
  ];

  cities: any[] = [];

  constructor(private fb: FormBuilder) {
    // Form
    this.formularioEvento = this.fb.group({
    });
  }

  ngOnInit(): void {
  
  }

  OnSubmit() {

  }
}
