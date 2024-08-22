import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private AuthService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.isAuthenticated();
    const isLoginRoute = state.url === '/login';

    if (isLoggedIn && isLoginRoute) {
      // Si está autenticado y trata de acceder al login, redirigir al dashboard
      return this.router.createUrlTree(['/dashboard']);
    }

    if (isLoggedIn || isLoginRoute) {
      // Si está autenticado o es la ruta de login, permitir acceso
      return true;
    }

    // Si no está autenticado y no es la ruta de login, redirigir al login
    return this.router.createUrlTree(['/login']);
  }

  private isAuthenticated(): boolean {
    return !!this.cookieService.get('TokenAdonis');
  }
}