import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-player-games',
  templateUrl: './player-games.component.html',
  styleUrls: ['./player-games.component.scss']
})
export class PlayerGamesComponent implements OnInit {
    gameHistory: any[] = [];
  
    constructor(private gameService: GameService) {}
  
    ngOnInit(): void {
      this.loadGameHistory();
    }

    loadGameHistory(): void {
      this.gameService.getPlayerGames().subscribe(
        (data) => {
          this.gameHistory = data;
          console.log('Game history:', this.gameHistory);
        },
        (error) => {
          console.error('Error fetching game history:', error);
        }
      );
    }
  }
