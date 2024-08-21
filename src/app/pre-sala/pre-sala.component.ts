import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-pre-sala',
  templateUrl: './pre-sala.component.html',
  styleUrls: ['./pre-sala.component.scss']
})
export class PreSalaComponent implements OnInit {
  code: number | null = null;
  creator: string | null = null;
  player2: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.code = params['code'];
      this.getRoomDetails();
    });
  }

  getRoomDetails() {
    this.gameService.getRoomDetails(this.code!).subscribe(
      (response) => {
        // Actualiza la estructura de acceso a las propiedades según la respuesta real
        this.creator = response.game.playerOneUser.username || null;
        this.player2 = response.game.playerTwoUser?.username || null;
      },
      (error) => {
        console.error('Error getting room details:', error);
      }
    );
  }
}
