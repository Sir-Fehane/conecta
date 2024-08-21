import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'; // O el servicio de cookies que estés usando
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private apiUrl = `${environment.apiUrl}/friends`;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService // O el servicio de cookies que estés usando
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('TokenAdonis'); // O como estés manejando el token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  addFriend(username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { username }, { headers: this.getHeaders() });
  }

  acceptFriend(username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/accept`, { username }, { headers: this.getHeaders() });
  }

  blockFriend(username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/block`, { username }, { headers: this.getHeaders() });
  }

  listFriends(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { headers: this.getHeaders() });
  }
}
