import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ModuloPrincipalRoutingModule } from './modulo-principal/modulo-principal-routing.module';
import { ApiConfiguration } from './api/api-configuration';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ModuloPrincipalModule } from './modulo-principal/modulo-principal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    NoopAnimationsModule,
    HttpClientModule,
    ModuloPrincipalModule,
    ModuloPrincipalRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule, 
    ReactiveFormsModule,

  ],
  providers: [
    [Title],{
      provide: APP_INITIALIZER,
      multi:true,
      deps: [ApiConfiguration],
      useFactory:(appConfigService:ApiConfiguration)=>{
        return() =>{
          return appConfigService.loadAppConfig()
        };
      }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
