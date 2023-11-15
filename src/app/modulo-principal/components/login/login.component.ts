import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginDto, UserDto } from 'src/app/api/models';
import { UserService } from 'src/app/api/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
formLogin!: FormGroup
userLoguin: LoginDto [] = []


constructor(private fb : FormBuilder, private userService: UserService, public route: Router ){
  localStorage.removeItem("usuarioLogueado") 
this.formLogin = this.fb.group({
  email: new FormControl('', [Validators.required, Validators.minLength(5)]),
  password: new FormControl('', [Validators.required, Validators.minLength(3)])
})

}
  ngOnInit(): void {
    
  }

  OnSubmit(){
    let usuario : LoginDto = {
      email: this.formLogin.controls['email'].value,
      password: this.formLogin.controls['password'].value
    }
    
    if(this.formLogin.valid){
      console.log(this.userLoguin)
      this.userService.apiUserLoginPost$Response({body:usuario}).subscribe((res:any) =>{
        let json = JSON.parse(res.body) as any
        if(json){
          localStorage.setItem("usuarioLogueado", res.body) 
          this.route.navigate(['Home'])
        }else{
          localStorage.removeItem("usuarioLogueado")
        }
      })
  
    }
  

  }
}
