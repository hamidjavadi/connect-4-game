import { BackgroundColor, TextColor } from "./types/colors";
import inquirer from "inquirer";
import { Player } from "./types/player";
import { gameDimension, gameStatus } from "./types/game";
import { GameBoard } from "./gameboard.class";
import { Node } from "./node.class";
import { NodeStatus } from "./types/node";

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
    backgroundColor: BackgroundColor.Black,
    beadBackgroundColor: BackgroundColor.Magenta,
    beadTextColor: TextColor.Magenta,
    textColor: TextColor.Magenta,
  };
  player2: Player = {
    backgroundColor: BackgroundColor.Black,
    beadBackgroundColor: BackgroundColor.Cyan,
    beadTextColor: TextColor.Cyan,
    textColor: TextColor.Cyan,
  };
  prompt = inquirer.createPromptModule();
  winnerPlayer!: Player | undefined;

  constructor() {
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

          this.renderPlayer();
          this.renderGameBoard();
          this.getPlayerInput();

          this.gameStatus = gameStatus.CheckStatus;
          break;
        case gameStatus.CheckStatus:
          this.checkGameStatus();
          break;
        case gameStatus.Finishing:
          this.gameBoard.showConnectedNodes();
          this.gameStatus = gameStatus.ShowResult;

          this.runGame();
          break;
        case gameStatus.ShowResult:

          this.renderGameBoard();
          this.showWinner();
          this.menuExitResetGame();

          break;
        case gameStatus.Finished:
          process.exit();

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Checks the latest game status and set it to the next status
   * 
   */
  checkGameStatus() {
    try {
      if (this.gameBoard.hasConnection(this.connectionCount) === false) {
        this.gameStatus = gameStatus.Running;
        this.turnPlayers();
      } else {
        this.gameStatus = gameStatus.Finishing;
      }

      this.runGame();
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Receives the beads connections to win
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
        this.connectionCount = Number(answers['Enter number of connections to win']);
      }).finally(() => {
        this.runGame();
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Receives game board dimension form user
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
   * Receives players name
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

      // Add a gap from the top
      console.log();

      this.prompt([
        {
          name: 'Choose a column',
          validate: (column) => {

            // Check if it is a number
            if (isNaN(column)) {
              return 'Please enter a number'
            }

            // Check if it is in the impossible range
            if (column < 1 || column > this.gameDimension.columns) {
              return `Please enter a number between 1 and ${this.gameDimension.columns}`;
            }

            // Check if it is possible to choose from board
            if (this.gameBoard.hasEmptyNodeInColumn(column - 1) === false) {
              return `Column number ${column} is full, please choose another column`;
            }

            return true;

          }
        }
      ])
        .then(answers => {
          const columnNumber = answers['Choose a column'] - 1;
          const newNode: Node = {
            backgroundColor: this.currentPlayer.beadBackgroundColor,
            column: columnNumber,
            row: -1,
            status: NodeStatus.Filled,
            text: '',
            textColor: this.currentPlayer.beadTextColor
          };

          this.gameBoard.putNewNodeInColumn(columnNumber, newNode);

          this.runGame();
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
   * Shows a menu to the players to choose restart game or exit from the game
   * 
   */
  menuExitResetGame() {
    try {

      // Add a gap to the top
      console.log();

      const prompt = inquirer.createPromptModule();
      prompt([
        {
          name: "What do you want to do?",
          type: 'list',
          choices: [
            'Quite',
            'Restart'
          ]
        }
      ]).then(answers => {
        if (answers["What do you want to do?"] === 'Quite') {
          this.gameStatus = gameStatus.Finished;
        }

        if (answers["What do you want to do?"] === 'Restart') {
          this.gameStatus = gameStatus.Setup;
        }

        this.runGame();
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Renders the latest state of the game board
   * 
   */
  renderGameBoard() {
    try {

      this.gameBoard.render();

    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Renders the current player
   * 
   */
  renderPlayer() {
    try {

      // Add a gap to the top
      console.log();

      console.log(` ${this.currentPlayer.backgroundColor}${this.currentPlayer.textColor}${this.currentPlayer.name}!\x1b[0m it's your turn`)

    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Shows the winner player
   * 
   */
  showWinner() {
    try {
      // Add a gap to the top
      console.log();

      console.log(`Congratulations! ${this.currentPlayer.textColor}${this.currentPlayer.name} \x1b[0m`);
      console.log(`You won !!!`);

    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Starts the game
   */
  startGame() {
    this.runGame();
  }

  /**
   * Changes the players turn
   *
   */
  turnPlayers() {
    try {

      if (this.currentPlayer === this.player1) {
        this.currentPlayer = this.player2;
      } else {
        this.currentPlayer = this.player1
      }

    } catch (error) {
      console.log(error);

    }
  }
}
