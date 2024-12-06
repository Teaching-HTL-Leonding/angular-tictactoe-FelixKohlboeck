import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule for ngFor and ngIf

@Component({
  selector: 'app-tic-tac-toe-game',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for ngFor and ngIf
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.css']
})
export class TicTacToeGameComponent {
  readonly WIDTH = 3;
  readonly HEIGHT = 3;
  readonly X_SYMBOL = '❌';
  readonly O_SYMBOL = '⭕';
  readonly CELL_CLASS = 'cell';

  cells: string[][] = [];
  moves: string[] = [];
  scores = { X: 0, O: 0 };
  currentPlayer = this.O_SYMBOL;
  message = '';
  botMode = false;

  constructor() {
    this.initializeBoard();
  }

  initializeBoard() {
    this.cells = Array(this.HEIGHT).fill(null).map(() => Array(this.WIDTH).fill(''));
    this.moves = [];
    this.message = '';
  }

  handleCellClick(x: number, y: number) {
    if (this.cells[y][x] || this.checkWinner()) {
      return; // Ignore if cell is already filled or game over
    }

    this.cells[y][x] = this.currentPlayer;
    this.moves.push(this.currentPlayer);

    if (this.checkWinner()) {
      this.message = `${this.currentPlayer} wins!`;
      this.updateScores();
    } else if (this.moves.length === this.WIDTH * this.HEIGHT) {
      this.message = 'Draw!';
    } else {
      this.switchPlayer();
    }

    if (this.botMode && !this.checkWinner() && this.currentPlayer === this.X_SYMBOL) {
      setTimeout(() => this.playBotMove(), 500); // Delay for bot move
    }
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.X_SYMBOL ? this.O_SYMBOL : this.X_SYMBOL;
  }

  playBotMove() {
    let emptyCells = [];
    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        if (!this.cells[y][x]) {
          emptyCells.push({ x, y });
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      this.handleCellClick(randomCell.x, randomCell.y);
    }
  }

  checkWinner(): boolean {
    // Check rows, columns, and diagonals
    for (let y = 0; y < this.HEIGHT; y++) {
      if (this.cells[y][0] && this.cells[y][0] === this.cells[y][1] && this.cells[y][1] === this.cells[y][2]) {
        return true;
      }
    }

    for (let x = 0; x < this.WIDTH; x++) {
      if (this.cells[0][x] && this.cells[0][x] === this.cells[1][x] && this.cells[1][x] === this.cells[2][x]) {
        return true;
      }
    }

    if (this.cells[0][0] && this.cells[0][0] === this.cells[1][1] && this.cells[1][1] === this.cells[2][2]) {
      return true;
    }

    if (this.cells[0][2] && this.cells[0][2] === this.cells[1][1] && this.cells[1][1] === this.cells[2][0]) {
      return true;
    }

    return false;
  }

  updateScores() {
    if (this.currentPlayer === this.X_SYMBOL) {
      this.scores.X++;
    } else {
      this.scores.O++;
    }
  }

  resetGame() {
    this.initializeBoard();
    this.currentPlayer = this.O_SYMBOL; // X starts again
  }

  toggleBotMode() {
    this.botMode = !this.botMode;
  }
}
