import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pre-sala',
  templateUrl: './pre-sala.component.html',
  styleUrls: ['./pre-sala.component.scss']
})
export class PreSalaComponent {
  @Input() playerOneName: string = '';
  @Input() playerTwoName: string = '';
  
  selectedRows: number = 6;
  selectedColumns: number = 6;

  setBoardSize(rows: number, columns: number): void {
    this.selectedRows = rows;
    this.selectedColumns = columns;
  }

  startGame(): void {
    // Aquí puedes redirigir al componente del juego pasando las filas y columnas seleccionadas
    // y otros detalles de los jugadores si es necesario
  }
}

