import { GameBoard } from "../classes/gameboard.class"
import { Player } from "./player"

export interface IGame {
  connectionCount: number,
  currentPlayer: Player,
  gameBoard: GameBoard,
  gameDimension: gameDimension
  gameStatus: gameStatus,
  player1: Player,
  player2: Player,
  prompt: any,
  winnerPlayer: Player | undefined,
  runGame: Function,
  checkGameStatus: Function,
  getConnectionsCount: Function,
  getGameDimension: Function,
  getPlayersName: Function,
  getPlayerInput: Function,
  makeGameReady: Function,
  menuExitResetGame: Function,
  renderGameBoard: Function,
  renderPlayer: Function,
  showWinner: Function,
  startGame: Function,
  turnPlayers: Function,
}

export type gameDimension = {
  columns: number,
  rows: number
}

export enum gameStatus {
  Setup = 'Setup',
  GetGameDimensions = 'GetGameDimensions',
  GetConnectionsCount = 'GetConnectionsCount',
  GetPlayersName = 'GetPlayersName',
  MakeGameReady = 'MakeGameReady',
  Running = 'Running',
  CheckStatus = 'CheckStatus',
  Finishing = 'Finishing',
  Finished = 'Finished',
  ShowResult = 'ShowResult'
}
