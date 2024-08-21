import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-player-games',
  templateUrl: './player-games.component.html',
  styleUrls: ['./player-games.component.scss']
})
export class PlayerGamesComponent implements OnInit {
    games: Game[] = [];
  
    constructor(private gameService: GameService) {}
  
    ngOnInit(): void {
  
      this.gameService.getPlayerGames().subscribe((data) => {
        this.games = data;
        console.log(data)
      });
    }
  }
