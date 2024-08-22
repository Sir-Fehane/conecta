import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { Game } from 'src/app/game';

@Component({
  selector: 'app-pre-sala',
  templateUrl: './pre-sala.component.html',
  styleUrls: ['./pre-sala.component.scss']
})
export class PreSalaComponent implements OnInit {
  code: number | null = null;
  creator: string | null = null;
  player2: string | null = null;
  currentUser: string | null = null;  // Almacena el usuario actual
  width: number = 9;
  height: number = 9;
  isCreator: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.code = params['code'];
      this.getRoomDetails();
      this.getPlayer();
      this.waitForSecondPlayer();
      
      this.gameService.onFormSubmit(() => {
        this.router.navigate(['/board'], { queryParams: { width: this.width, height: this.height, code: this.code } });
      });
    });
  }

  getRoomDetails() {
    if (this.code === null) return;

    this.gameService.getRoomDetails(this.code).subscribe(
      (response: Game) => {
        const game = response.game;
        this.creator = game.playerOneUser.username;
        this.player2 = game.playerTwoUser?.username || 'Esperando jugador...';
      },
      (error) => {
        console.error('Error getting room details:', error);
      }
    );
  }

  getPlayer() {
    this.gameService.getPlayer().subscribe(
      (response) => {
        this.currentUser = response.username;  // Almacena el usuario actual
        this.isCr();
        console.log('Current user:', this.currentUser);
        console.log('Creator:', this.creator);
        this.gameService.socket.emit('joinRoom', this.code, this.currentUser);
      },
      (error) => {
        console.error('Error getting player:', error);
      }
    );
  }

  waitForSecondPlayer() {
    if (this.code !== null) {
      this.gameService.waitForPlayerJoin(this.code);

      this.gameService.onPlayerJoined((player) => {
        console.log('Player joined:', player);
        this.player2 = player.username;
      });
    }
  }

  onSubmit() {
    if (this.code !== null) {
      this.gameService.emitFormSubmit(this.code, { width: this.width, height: this.height });

      this.gameService.onFormSubmit(() => {
        this.router.navigate(['/board'], { queryParams: { width: this.width, height: this.height, code: this.code } });
      });
    }
  }

  isCr() {
    if (this.currentUser == this.creator) {
      this.isCreator = true;
      return
    }
    else {
      this.isCreator = false;
      return
    }
  }
}

