import { BackgroundColor, TextColor } from "./types/colors";
import inquirer from "inquirer";
import { Player } from "./types/player";
import { gameDimension, gameStatus } from "./types/game";
import { GameBoard } from "./gameboard.class";

export class Game {

  connectionCount: number = 2;
  currentPlayer!: Player;
  gameBoard!: GameBoard;
  gameDimension: gameDimension = {
    columns: 0,
    rows: 0
  };
  gameStatus: gameStatus = gameStatus.Setup;
  player1: Player = {
    backgroundColor: BackgroundColor.Green,
    beadBackgroundColor: BackgroundColor.Green,
    beadTextColor: TextColor.Green,
    textColor: TextColor.White,
  };
  player2: Player = {
    backgroundColor: BackgroundColor.Cyan,
    beadBackgroundColor: BackgroundColor.Cyan,
    beadTextColor: TextColor.Cyan,
    textColor: TextColor.White,
  };
  prompt = inquirer.createPromptModule();
  winnerPlayer!: Player | undefined;

  constructor() {

    /**** test data ***/
    this.connectionCount = 4;
    this.gameDimension = {
      columns: 10,
      rows: 10
    };
    this.gameStatus = gameStatus.MakeGameReady;
    this.player1.name = 'Hamid';
    this.player2.name = 'Marzieh';
    /**** /test data ***/

    this.startGame();
  }

  /**
   * Run the game loop
   * 
   */
  runGame() {

    // Clear screen
    console.clear();

    try {

      switch (this.gameStatus) {
        case gameStatus.Setup:
          this.gameStatus = gameStatus.GetGameDimensions;
          this.runGame();
          break;
        case gameStatus.GetGameDimensions:
          this.getGameDimension();

          // Next step
          this.gameStatus = gameStatus.GetConnectionsCount;
          break;
        case gameStatus.GetConnectionsCount:
          this.getConnectionsCount();

          // Next step
          this.gameStatus = gameStatus.GetPlayersName;
          break;
        case gameStatus.GetPlayersName:
          this.getPlayersName();

          // Next step
          this.gameStatus = gameStatus.MakeGameReady;
          break;
        case gameStatus.MakeGameReady:
          this.makeGameReady();

          // Next step
          this.gameStatus = gameStatus.Running;
          this.runGame();
          break;
        case gameStatus.Running:
          this.getPlayerInput();

          console.log();
          this.renderGame();

          // this.gameStatus = gameStatus.Finishing;
          break;
        case gameStatus.Finishing:
          this.gameStatus = gameStatus.ShowResult;
          break;
        case gameStatus.ShowResult:
          console.log(
            'columns:', this.gameDimension.columns,
            'rows', this.gameDimension.rows,
            'player1', this.player1,
            'player2', this.player2
          );
          this.gameStatus = gameStatus.Finished;
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get the beads connections to win
   * @param connections number
   * @returns void
   */
  getConnectionsCount() {
    try {
      this.prompt([
        {
          name: 'Enter number of connections to win',
          validate: (input) => {

            const maxConnections = Math.floor((this.gameDimension.columns + this.gameDimension.rows) / 2);

            if (isNaN(input)) {
              return 'Enter a valid number';
            }

            if (input > maxConnections) {
              return `Enter a number less than ${maxConnections}`;
            }

            // input is valid
            return true;
          }
        }
      ]).then((answers) => {
        this.connectionCount = answers['Enter number of connections to win'];
      }).finally(() => {
        this.runGame();
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get game board dimension form user
   * 
   * @param Column number
   * @param Rows number
   * @returns void
   */
  getGameDimension() {

    try {
      this.prompt([
        {
          name: 'Enter column count (5 to 100)',
          validate: (input) => {

            if (isNaN(input)) {
              return 'Enter a valid number';
            }

            if (input < 5 || input > 100) {
              return 'Enter a valid number';
            }

            // input is valid
            return true;
          }
        },
        {
          name: 'Enter row count (5 to 100)',
          validate: (input) => {

            if (isNaN(input)) {
              return 'Enter a valid number';
            }

            if (input < 5 || input > 100) {
              return 'Enter a valid number';
            }

            // input is valid
            return true;
          }
        }
      ]).then((answers) => {
        this.gameDimension.columns = Number(answers['Enter column count (5 to 100)']);
        this.gameDimension.rows = Number(answers['Enter row count (5 to 100)']);
      }).finally(() => {
        this.runGame();
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Get players name
   * 
   * @param playerOne string
   * @param playerTwo string
   * @returns void
   */
  getPlayersName() {
    try {
      this.prompt([
        {
          name: 'Enter player one name',
          validate: (input) => {

            if (input === '') {
              return 'Please enter a name';
            }

            // input is valid
            return true;
          }
        },
        {
          name: 'Enter player two name',
          validate: (input) => {

            if (input === '') {
              return 'Please enter a name';
            }

            // input is valid
            return true;
          }
        }
      ]).then((answers) => {
        this.player1.name = answers['Enter player one name'];
        this.player2.name = answers['Enter player two name'];
      }).finally(() => {
        this.runGame();
      });
    } catch (error) {
      console.log(error);
    }
  }


  /**
   * Gets player input to choose a column and put a bead in it
   *  
   */
  getPlayerInput() {
    try {
      this.prompt([
        {
          name: 'Choose a column',
          validate: (column) => {

            if (isNaN(column)) {
              return 'Please enter a number'
            }

            if (column < 1 || column > this.gameDimension.columns) {
              return `Please enter a number between 1 and ${this.gameDimension.columns}`;
            }

            return true;

          }
        }
      ])
        .then(answers => {
          console.log(answers);
        })
    } catch (error) {
      console.log(error);

    }
  }


  /**
   * Makes the game ready by generating game board
   * 
   */
  makeGameReady() {
    try {

      this.gameBoard = new GameBoard(this.gameDimension.columns, this.gameDimension.rows);
      this.currentPlayer = this.player1;
      this.winnerPlayer = undefined;

    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Renders the latest state of the game
   * 
   */
  renderGame() {
    try {

      this.gameBoard.render();

    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Start the game
   */
  startGame() {
    this.runGame();
  }
}
