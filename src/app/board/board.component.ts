import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() rows: number = 9;
  @Input() columns: number = 9;
  @Input() roomId: string = '';
  @Input() board: number[][] = [];
  currentPlayer: number = 1;
  isMyTurn: boolean = true;

  constructor(private socketService: SocketService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initializeBoard();
    this.listenToSocketEvents();
  }

  private listenToSocketEvents(): void {
    this.socketService.on('game_update', (data: any) => {
      if (data.game) {
        this.board = JSON.parse(data.game.board);
        this.currentPlayer = data.game.currentTurn;
        this.isMyTurn = this.currentPlayer === 1; // Ajusta la lógica si es necesario
        this.cdRef.detectChanges(); // Asegura que la vista se actualiza
      }
      if (data.winner) {
        alert(`Jugador ${data.winner.username} ha ganado!`);
      }
    });
  }

  dropPiece(colIndex: number): void {
    if (!this.isMyTurn) {
      return alert('No es tu turno');
    }

    for (let rowIndex = this.rows - 1; rowIndex >= 0; rowIndex--) {
      if (this.board[rowIndex][colIndex] === 0) {
        this.board[rowIndex][colIndex] = this.currentPlayer;
        // Enviar movimiento al servidor
        this.socketService.emit('move', { roomId: this.roomId, board: this.board, currentPlayer: this.currentPlayer });
        break;
      }
    }
  }

  initializeBoard(): void {
    this.board = Array.from({ length: this.rows }, () => Array(this.columns).fill(0));
    this.currentPlayer = 1;
    this.isMyTurn = true;
    this.cdRef.detectChanges(); // Asegura que la vista se actualiza
  }

  getPieceClass(row: number, col: number): string {
    if (this.board[row][col] === 1) return 'player1';
    if (this.board[row][col] === 2) return 'player2';
    return '';
  }
}
