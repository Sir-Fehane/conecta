import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/game'; // Ajusta la ruta según tu modelo

@Component({
  selector: 'app-pre-sala',
  templateUrl: './pre-sala.component.html',
  styleUrls: ['./pre-sala.component.scss']
})
export class PreSalaComponent implements OnInit {
  code: number | null = null;
  creator: string | null = null;
  player2: string | null = null;
  board: number[][] = [];
  width: number = 9;
  height: number = 9;
  number1: number = 6;
  number2: number = 6;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.code = params['code'];
      this.getRoomDetails();
    });
  }

  getRoomDetails() {
    if (this.code === null) return;

    this.gameService.getRoomDetails(this.code).subscribe(
      (response: Game) => {
        const game = response.game;

        this.creator = game.playerOneUser.username;
        this.player2 = game.playerTwoUser?.username || 'Esperando jugador...';

        // Set width and height
        this.width = game.width;
        this.height = game.height;

        // Initialize board
        this.initializeBoard(game.board);

        // Redirect to the board page if the game is already set up
        if (this.player2 !== 'Esperando jugador...') {
          this.router.navigate(['/board'], { queryParams: { width: this.width, height: this.height, code: this.code } });
        }
      },
      (error) => {
        console.error('Error getting room details:', error);
      }
    );
  }

  initializeBoard(boardString: string) {
    this.board = Array(this.height).fill(0).map(() => Array(this.width).fill(0));
    
    const boardArray = JSON.parse(boardString);
    
    for (let r = 0; r < this.height; r++) {
      for (let c = 0; c < this.width; c++) {
        this.board[r][c] = boardArray[r][c] || 0;
      }
    }
  }

  onSubmit() {
    // Handle form submission logic here
    this.router.navigate(['/board'], { queryParams: { width: this.width, height: this.height, code: this.code } });
  }
}
