import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDto } from '../api/models';

export class LoginGuard  {
	constructor(private router: Router) {}
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
      
			if (usuarioString !== null) {
				const usuario = JSON.parse(usuarioString) as any;
				const token = usuario.token
				if (!token) {
					return false;
				}
				return true;
				} else {
					return false; 
				}
		} catch (error) {
			location.reload();
			return false
		}
	}
}
