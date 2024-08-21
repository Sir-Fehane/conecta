import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() rows: number = 9;
  @Input() columns: number = 9;
  board: number[][] = [];
  currentPlayer = 1;

  ngOnInit(): void {
    this.initializeBoard();
  }

  initializeBoard(): void {
    this.board = Array(this.rows)
      .fill(0)
      .map(() => Array(this.columns).fill(0));
  }

  dropPiece(colIndex: number): void {
    for (let rowIndex = this.rows - 1; rowIndex >= 0; rowIndex--) {
      if (this.board[rowIndex][colIndex] === 0) {
        this.board[rowIndex][colIndex] = this.currentPlayer;
        if (this.checkWin(rowIndex, colIndex)) {
          alert(`Jugador ${this.currentPlayer} gana!`);
          this.initializeBoard();
        }
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
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
}
