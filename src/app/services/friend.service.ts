import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  private apiUrl = `${environment.apiUrl}/friends`;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.get('TokenAdonis'); 
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
