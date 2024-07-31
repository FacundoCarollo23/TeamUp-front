
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginDto, UserDto } from 'src/app/api/models';
import { UserService } from 'src/app/api/services';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
formLogin!: FormGroup
userLoguin: LoginDto [] = []
showPassword = false;

constructor(private fb : FormBuilder, private userService: UserService, public route: Router ){
  localStorage.removeItem("usuarioLogueado") 
this.formLogin = this.fb.group({
  email: new FormControl('', [
    Validators.required,
    Validators.pattern(
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    ),
    Validators.minLength(3)
  ]),
  password: new FormControl('', [Validators.required, Validators.minLength(8),Validators.maxLength(15), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/)])
})

}
  ngOnInit(): void {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  OnSubmit(){
    let usuario : LoginDto = {
      email: this.formLogin.controls['email'].value,
      password: this.formLogin.controls['password'].value
    }
    
    if(this.formLogin.valid){
      this.userService.apiUserLoginPost$Response({body:usuario}).subscribe((res:any) =>{
        let json = JSON.parse(res.body) as any
        if(json.value.token){
          localStorage.setItem("usuarioLogueado", res.body) 
          this.route.navigate(['TeamUp'])
        }else{
          localStorage.removeItem("usuarioLogueado")
        }
      })
  
    }
  

  }
}
