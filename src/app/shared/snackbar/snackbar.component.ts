import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit{

   
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data : any, public sb: SnackBarService){

  }


  ngOnInit(): void {

  }

  ActionSnackbar(){
    if(this.data.action == "Cerrar" || this.data.action== "Aceptar"){
      window.location.reload()
    }
    
  }
}
