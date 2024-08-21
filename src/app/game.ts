export interface Game {
    game:{
    id: number;
    playerOne: number;
    playerTwo: number;
    winner: number;
    numsala: number;
    width: number;
    height: number;
    board: string;
    currentTurn: number;
    playerOneUser: {
      id: number;
      username: string;
    };
    playerTwoUser: {
      id: number;
      username: string;
    } | null;
    winnerUser: {
        id: number;
        username: string;
      } | null;
    created_at: string;
    updated_at: string;
}
  }