import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(): boolean {
    const token = this.cookieService.get('TokenAdonis');
    if (token) {
      return true;
    } else {
      // Redirigir al login si no hay token
      this.router.navigate(['/login']);
      return false;
    }
  }
}

