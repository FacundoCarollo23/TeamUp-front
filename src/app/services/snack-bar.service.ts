import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shared/snackbar/snackbar.component';


@Injectable({
  providedIn: 'root',
})

export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string, verticalPosition?: string, horizontalPosition?:string, duration?: number) {

   const snackBar = this.snackBar.openFromComponent(SnackbarComponent, {
      duration: duration,
      verticalPosition: verticalPosition ='bottom',
      horizontalPosition: horizontalPosition = 'end',
      panelClass: 'custom-snackbar', 
      data: { message: message , action: action}, 
      
    });
    return snackBar
  }

  closeSnackBar(){
    this.snackBar.dismiss()
  }

 
  

  respuestaErrorObj(error:any){

    let err = ""

    if (error.error.Errors != null) 
    error.error.Errors.forEach((element:any) => {
      err += JSON.stringify(element);
    });
      
    
  }

  respuestaError(error:any, titulo:any) {
    console.log(error);
    let errores = JSON.parse(JSON.parse(JSON.stringify(error.error))) ;//(error.error as any);
    console.log(errores);
    let err = titulo + ': ' + JSON.stringify(errores.Message);

    if (errores.errors != null) 
      err += JSON.stringify(errores.errors);
      console.log(err);


    if (errores.errors != null) 
      err += errores.Message.toString()
      console.log(err);


    if (errores.Errors != null) 
    errores.Errors.forEach((element: any) => {
      err += JSON.stringify(element);
    });
      
      console.log(err);

    
    // if (errores['Errors'] != null) 
    // err += JSON.stringify(errores.Errors);
    // console.log(err);

    // console.log(errores.Message.toString());
    const snackBar = this.openSnackBar(err, "Cerrar",'','',3000);
    snackBar.onAction().subscribe(() => {
      snackBar.dismiss(); 
    });

  }
  mensaje(msj:any,duration:any) {
    const snackBar = this.openSnackBar(msj, "Cerrar" ,'', '', duration);
    snackBar.onAction().subscribe(() => {
      snackBar.dismiss(); 
    });
  }





  

}
