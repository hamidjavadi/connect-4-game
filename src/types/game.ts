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
  Finishing = 'Finishing',
  Finished = 'Finished',
  ShowResult = 'ShowResult'
}
