import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  rows: number = 5;
  columns: number = 5;
  roomId: number = 0; // Se recibe del parámetro de consulta
  board: number[][] = [];
  currentPlayer: number = 1;
  isMyTurn: boolean = true; // Asume que el jugador 1 empieza
  playerOne: string = '';
  playerTwo: string = '';

  constructor(
    private route: ActivatedRoute, 
    private gameService: GameService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.rows = +params['height'] || 5;
      this.columns = +params['width'] || 5;
      this.roomId = params['code'] || 0;
      this.initializeBoard();
      this.listenToSocketEvents();
      this.getBoardPlayers(); // Obtener los jugadores de la sala
    });
  }

  initializeBoard(): void {
    this.board = Array(this.rows)
      .fill(0)
      .map(() => Array(this.columns).fill(0));
  }

  // Escuchar eventos de WebSocket
  private listenToSocketEvents(): void {
    // Escuchar cuando comienza el juego y se asigna el primer turno
    this.gameService.on('startGame', (data: any) => {
      this.isMyTurn = this.gameService.getId() === data.currentPlayer; // Verificar si es mi turno
    });

    // Escuchar movimientos de otros jugadores
    this.gameService.on(`move_${this.roomId}`, (data: any) => {
      this.board = data.board;
      this.isMyTurn = this.gameService.getId() === data.currentPlayer; // Verificar si es mi turno
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    });

    this.gameService.on('gameOver', (data: any) => {
      alert(`Jugador ${data.winner} gana!`);
      this.router.navigate(['/dashboard']);
    });
  }

  // Manejar el drop de una pieza
  dropPiece(colIndex: number): void {
    if (!this.isMyTurn) {
      return alert('No es tu turno');
    }

    for (let rowIndex = this.rows - 1; rowIndex >= 0; rowIndex--) {
      if (this.board[rowIndex][colIndex] === 0) {
        this.board[rowIndex][colIndex] = this.currentPlayer;
        if (this.checkWin(rowIndex, colIndex)) {
          this.gameService.emit('gameWon', { roomId: this.roomId, winner: this.currentPlayer });
        } else {
         /* this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
          this.isMyTurn = !this.isMyTurn; */
          this.gameService.emit('move', { roomCode: this.roomId, board: this.board, currentPlayer: this.gameService.getId() });
        }
        break;
      }
    }
  }

  checkWin(row: number, col: number): boolean {
    return this.checkDirection(row, col, 1, 0) || // Horizontal
           this.checkDirection(row, col, 0, 1) || // Vertical
           this.checkDirection(row, col, 1, 1) || // Diagonal ascendente
           this.checkDirection(row, col, 1, -1);  // Diagonal descendente
  }

  checkDirection(row: number, col: number, rowDir: number, colDir: number): boolean {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
      const r = row + i * rowDir;
      const c = col + i * colDir;
      if (r >= 0 && r < this.rows && c >= 0 && c < this.columns && this.board[r][c] === this.currentPlayer) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
    }
    return false;
  }

  getPieceClass(row: number, col: number): string {
    if (this.board[row][col] === 1) return 'player1';
    if (this.board[row][col] === 2) return 'player2';
    return '';
  }

  getBoardPlayers() {
  this.gameService.getRoomDetails(this.roomId).subscribe((data: any) => {
    this.playerOne = data.game.playerOneUser.username;
    this.playerTwo = data.game.playerTwoUser.username;
    console.log(this.playerOne, this.playerTwo);

    // Emitir un nuevo evento solo para el tablero
    this.gameService.emit('joinWithPlayers', {
      roomCode: this.roomId,
      playerOne: this.playerOne,
      playerTwo: this.playerTwo
    });
  });
}
}
