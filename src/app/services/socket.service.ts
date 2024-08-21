import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket = {} as Socket;

  constructor() {
    this.connect();
  }

  private connect(): void {
    // Configura la conexión al servidor WebSocket
    this.socket = io(environment.apiUrl, {
      transports: ['websocket', 'polling'], // Usar transportes de websocket y polling
    });

    // Maneja la conexión exitosa
    this.socket.on('connect', () => {
      console.log('Conectado al servidor WebSocket');
    });

    // Maneja la desconexión
    this.socket.on('disconnect', (reason) => {
      console.warn('Desconectado del servidor WebSocket:', reason);
      // Reconectar si el servidor cierra la conexión
      if (reason === 'io server disconnect') {
        this.socket.connect();
      }
    });

    // Maneja errores de conexión
    this.socket.on('connect_error', (error) => {
      console.error('Error de conexión al WebSocket:', error);
    });
  }

  // Método para escuchar eventos
  on(event: string, callback: (data: any) => void): void {
    this.socket.on(event, callback);
  }

  // Método para emitir eventos
  emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  // Método para desconectar
  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
  off(event: string) {
    this.socket.off(event);
  }

}