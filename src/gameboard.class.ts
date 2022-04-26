import { Node } from "./node.class";
import { NodeStatus } from "./types/node";

export class GameBoard {

  boardTable: Node[][] = [];
  boardColumns: number = 0
  boardRows: number = 0;
  latestAddedNode!: Node;

  constructor(boardColumns: number, boardRows: number) {
    this.boardColumns = boardColumns;
    this.boardRows = boardRows;

    this.initTable();
  }

  /**
   * Initiates the table nodes
   * 
   */
  private initTable() {
    try {

      let columns: Node[] = [];

      for (let row = 0; row < this.boardRows; row++) {
        for (let col = 0; col < this.boardColumns; col++) {
          columns.push(new Node(col, row));
        }

        this.boardTable.push(columns);
        columns = [];
      }

      /********************************************************************* test /
      this.TestAddNode();
      /********************************************************************* end test */


    } catch (error) {
      console.log(error);
    }
  }

  /********************************************************************* test /
  beadBackgroundColor = BackgroundColor.White;
  beadTextColor = TextColor.White;
  currentTestNodeNumber = 0;

  TestAddNode() {
    let col = Math.floor(Math.random() * 10);
    let newNode = new Node(0, 0);
    let totalNodes = (this.boardColumns * this.boardRows) / 3;

    if (this.beadBackgroundColor !== BackgroundColor.Green) {
      this.beadBackgroundColor = BackgroundColor.Green;
      this.beadTextColor = TextColor.Green;
    } else {
      this.beadBackgroundColor = BackgroundColor.Magenta;
      this.beadTextColor = TextColor.Magenta;
    }

    newNode.backgroundColor = this.beadBackgroundColor;
    newNode.textColor = this.beadTextColor;
    newNode.text = 'XX';

    this.putNewNodeInColumn(col, newNode);

    if (this.hasConnection(4) === false) {

      const prompt = inquirer.createPromptModule();

      prompt([{
        name: 'continue 2',
      }]).then(answers => {
        this.currentTestNodeNumber++;

        if (totalNodes > this.currentTestNodeNumber) {
          this.TestAddNode();
        }
      }).finally(() => {
        this.render();
      });
    }
  }
  /********************************************************************* end test */



  /**
   * Checks if a column has empty nodes
   * 
   * @param ColumnNumber number
   * @returns boolean
   */
  hasEmptyNodeInColumn(columnNumber: number) {
    try {
      let hasEmptyNode: boolean = false;

      hasEmptyNode = this.boardTable.some((row: Node[]) => {
        if (row[columnNumber].status === NodeStatus.Empty) {
          return true;
        }
      });

      return hasEmptyNode;

    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Looks for a connection with a specified length based on the latest added Node
   * 
   * @param length number
   * @returns boolean
   */
  hasConnection(length: number = 2) {
    try {

      // Begin check the vertical connections
      const verticalConnections: Node[] = this.getLatestAddedNodeVerticalConnections();
      if (verticalConnections.length + 1 === length) {
        return true;
      }
      // End check the vertical connections

    } catch (error) {
      console.log(error);
    }

    return false;
  }

  /**
   * Gets the top and bottom connections of the latest added Node
   * 
   * @returns Node[]
   */
  getLatestAddedNodeVerticalConnections() {
    try {

      let bottomConnections: Node[] = this.getLatestAddedNodeBottomConnections();
      return bottomConnections;

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  /**
   * Gets the bottom connections of the latest added Node
   * 
   * @returns Node[]
   */
  getLatestAddedNodeBottomConnections(): Node[] {
    try {

      let bottomConnections: Node[] = [];
      let continueCounting: boolean = true;
      let nextNodeColumn: number = this.latestAddedNode.column;
      let nextNodeRow: number = this.latestAddedNode.row + 1;

      /* Begin count the bottom connections */
      while (continueCounting) {

        if (nextNodeRow < this.boardRows) {
          if (this.boardTable[nextNodeRow][nextNodeColumn].backgroundColor === this.latestAddedNode.backgroundColor) {
            console.log('Bottom Connection Found');

            bottomConnections.push(this.boardTable[nextNodeRow][nextNodeColumn]);
            nextNodeRow++;
          } else {
            continueCounting = false;
          }
        } else {
          continueCounting = false;
        }

      }
      /* End count the bottom connections */

      return bottomConnections;

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  /**
   * Puts a new node to the given column
   * 
   * @param columnNumber number
   * @param newNode Node
   */
  putNewNodeInColumn(columnNumber: number, newNode: Node) {
    try {

      let latestEmtpyNode: Node = newNode;

      if (this.hasEmptyNodeInColumn(columnNumber)) {
        this.boardTable.forEach((row: Node[]) => {
          if (row[columnNumber].status === NodeStatus.Empty) {
            latestEmtpyNode = row[columnNumber];
          }
        })
      }

      latestEmtpyNode.backgroundColor = newNode.backgroundColor;
      latestEmtpyNode.column = columnNumber;
      latestEmtpyNode.status = NodeStatus.Filled;
      latestEmtpyNode.textColor = newNode.textColor;

      this.latestAddedNode = latestEmtpyNode;

    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Renders board table
   * 
   */
  render() {
    try {

      // Add a gap above table
      for (let i = 0; i < 3; i++) {
        console.log();
      }

      // Begin render header numbers
      let headers: string = '';
      for (let col = 0; col < this.boardColumns; col++) {
        if (col > 10) {
          headers = headers.concat(` ${col + 1} `);
        } else {
          headers = headers.concat(` ${col + 1}  `);
        }

      }

      console.log(headers);
      // End render header numbers

      // Begin render nodes
      for (let row = 0; row < this.boardRows; row++) {

        let columns: String = '';

        for (let col = 0; col < this.boardColumns; col++) {
          const backgroundColor = this.boardTable[row][col].backgroundColor;
          const textColor = this.boardTable[row][col].textColor;
          const text = this.boardTable[row][col].text;

          columns = columns.concat(` ${backgroundColor}${textColor}${text}\x1b[0m `);
        }

        console.log(columns);

        // Add a gap between rows
        console.log();
      }
      // End render nodes

    } catch (error) {
      console.log(error);
    }
  }

}
