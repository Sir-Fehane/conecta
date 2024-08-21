import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private getHeaders() {
    const token = this.cookieService.get('TokenAdonis');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createRoom(): Observable<any> {
    return this.http.post(`${this.apiUrl}/games/create`, {}, { headers: this.getHeaders() });
  }

  joinRoom(numsala: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/games/join`, { numsala }, { headers: this.getHeaders() });
  }

  joinRoomByFriend(username: Text): Observable<any> {
    return this.http.post(`${this.apiUrl}/games/join/friend`, { username }, { headers: this.getHeaders() });
  }
}

