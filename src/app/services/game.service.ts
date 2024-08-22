import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { Game } from '../game';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = environment.apiUrl;
  public socket: Socket;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.socket = io(this.apiUrl); // Conecta el cliente Socket.IO al servidor
  }
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
  getRoomDetails(numsala: number) {
    return this.http.get<Game>(`${this.apiUrl}/room/${numsala}`);
  }
  getPlayerGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/history`, { headers: this.getHeaders() });
  }
  getPlayer(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`, { headers: this.getHeaders() });
  }
  waitForPlayerJoin(roomCode: number) {
    this.socket.emit('waitForPlayer', roomCode);
  }

  onPlayerJoined(callback: (player: any) => void) {
    this.socket.on('playerJoined', callback);
  }

  emitFormSubmit(roomCode: number, formData: any) {
    this.socket.emit('formSubmit', { roomCode, formData });
  }

  onFormSubmit(callback: () => void) {
    this.socket.on('navigateToBoard', callback);
  }
  
}

