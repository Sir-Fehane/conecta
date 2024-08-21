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
  isCreator: boolean = false; // Variable para verificar si el usuario es el creador

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    // Extraer el código de la sala de los parámetros de la ruta
    this.route.params.subscribe(params => {
      this.code = +params['code']; // Convertir a número
      if (this.code !== null) {
        this.getRoomDetails();
      }
    });
  }

  getRoomDetails(): void {
    if (this.code === null) return;

    // Obtener detalles de la sala del servicio
    this.gameService.getRoomDetails(this.code).subscribe(
      (response: Game) => {
        const game = response.game;

        this.creator = game.playerOneUser.username;
        this.player2 = game.playerTwoUser?.username || 'Esperando jugador...';

        // Verificar si el usuario actual es el creador de la sala
        // Puedes obtener el nombre de usuario actual desde un servicio de autenticación
        const currentUser = 'currentLoggedInUser'; // Reemplaza esto con el nombre de usuario actual
        this.isCreator = this.creator === currentUser;

        // Setear el ancho y alto del tablero
        this.width = game.width;
        this.height = game.height;

        // Inicializar el tablero
        this.initializeBoard(game.board);

        // Si el jugador actual no es el creador, redirigir al tablero de juego
        if (!this.isCreator) {
          this.router.navigate(['/board'], { queryParams: { width: this.width, height: this.height, code: this.code } });
        }
      },
      (error) => {
        console.error('Error getting room details:', error);
      }
    );
  }

  initializeBoard(boardString: string): void {
    this.board = Array(this.height).fill(0).map(() => Array(this.width).fill(0));
    
    try {
      const boardArray = JSON.parse(boardString);
    
      for (let r = 0; r < this.height; r++) {
        for (let c = 0; c < this.width; c++) {
          this.board[r][c] = boardArray[r]?.[c] || 0;
        }
      }
    } catch (e) {
      console.error('Error parsing board string:', e);
    }
  }

  onSubmit(): void {
    if (this.isCreator) {
      // Navegar al componente del tablero con los parámetros de consulta
      this.router.navigate(['/board'], { queryParams: { width: this.width, height: this.height, code: this.code } });
    } else {
      alert('Solo el creador puede ajustar el tamaño del tablero.');
    }
  }
}
