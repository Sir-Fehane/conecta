export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    username: string;
    remember_me_token: string | null;
    played_games: number;
    won_games: number;
    lost_games: number;
    created_at: string;
    updated_at: string;
  }
  
  export interface Game2 {
    id: number;
    player_one: number;
    player_two: number | null;
    winner: number | null;
    numsala: number;
    width: number | null;
    height: number | null;
    board: string;
    current_turn: number;
    created_at: string;
    updated_at: string;
    playerOneUser: User;
    playerTwoUser: User | null;
    winnerUser: User | null;
  }