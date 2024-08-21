import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private apiUrl = 'http://localhost:3333'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private getHeaders() {
    const token = this.cookieService.get('TokenAdonis'); // Asegúrate de que el token se guarde aquí
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  addFriend(username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/friends/add`, { username }, { headers: this.getHeaders() });
  }

  acceptFriend(username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/friends/accept`, { username }, { headers: this.getHeaders() });
  }

  blockFriend(username: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/friends/block`, { username }, { headers: this.getHeaders() });
  }

  listFriends(): Observable<any> {
    return this.http.get(`${this.apiUrl}/friends`, { headers: this.getHeaders() })
      .pipe(
        map((response: any) => response.map((friend: { username: string, status: string }) => ({
          username: friend.username,
          status: friend.status
        })))
      );
  }
}
