import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export class LoginGuard  {
	
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return this.LoginGuards();
	}

	private LoginGuards(
	): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		try{
			const usuarioString = localStorage.getItem('usuarioLogueado');
      /*
			if (usuarioString !== null) {
				const usuario = JSON.parse(usuarioString) as UserDto;
    
				const token = usuario.jwToken
				const refreshToken = usuario.refreshToken;
				const ti = { 'id': id, 'val': val };
		  	localStorage.setItem('ti', JSON.stringify(ti));
				if (!token) {
					return false;
				}
				return true;
				} else {
					return false; 
				}
        */
       return false;
			
		} catch (error) {
			location.reload();
			return false
		}
	}
}
