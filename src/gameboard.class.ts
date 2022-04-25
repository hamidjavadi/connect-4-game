import { Node } from "./node.class";

export class GameBoard {

  boardTable: Node[][] = [];
  boardColumns: number = 0
  boardRows: number = 0

  constructor(boardColumns: number, boardRows: number) {
    this.boardColumns = boardColumns;
    this.boardRows = boardRows;

    this.initTable();
  }

  initTable() {
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
        headers = headers.concat(` ${col + 1}  `);
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
