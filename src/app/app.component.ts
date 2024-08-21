import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'conecta';
  selectedRows: number = 6;
  selectedColumns: number = 6;

  setBoardSize(rows: number, columns: number): void {
    this.selectedRows = rows;
    this.selectedColumns = columns;
  }
}
