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

    } catch (error) {
      console.log(error);
    }
  }

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
      for (let i = 0; i < 5; i++) {
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
