import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { CookieService } from 'ngx-cookie-service'
import { Route, Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieservice: CookieService, private router: Router) {}

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data)
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data)
  }

    isLoggedIn(): boolean {
      return !!this.cookieservice.get('auth_token');
    }
    
    logout(): void {
      this.cookieservice.delete('TokenAdonis');
      this.router.navigate(['/login']);
    }
}

