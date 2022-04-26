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
   * Looks for a connection with a specified length based on the latest added Node
   * 
   * @param targetConnectionLength number
   * @returns boolean
   */
  hasConnection(targetConnectionLength: number = 2) {
    try {

      // Begin check the vertical connections
      const verticalConnections: Node[] = this.getLatestAddedNodeVerticalConnections();
      if (verticalConnections.length + 1 === targetConnectionLength) {
        return true;
      }
      // End check the vertical connections

      // Begin check the horizontal connections
      const horizontalConnections: Node[] = this.getLatestAddedNodeHorizontalConnections();
      if (horizontalConnections.length + 1 === targetConnectionLength) {
        return true;
      }
      // End check the horizontal connections

      // Begin check the diagonal connections (135 and 315 degrees)
      const diagonalConnections135_315: Node[] = this.getLatestAddedNodeDiagonalConnections135_315();
      if (diagonalConnections135_315.length + 1 === targetConnectionLength) {
        return true;
      }
      // End check the diagonal connections (135 and 315 degrees)

      // Begin check the diagonal connections (45 and 225 degrees)
      const diagonalConnections45_225: Node[] = this.getLatestAddedNodeDiagonalConnections45_225();
      if (diagonalConnections45_225.length + 1 === targetConnectionLength) {
        return true;
      }
      // End check the diagonal connections (45 and 225 degrees)

    } catch (error) {
      console.log(error);
    }

    return false;
  }

  /**
   * Gets the digonal connections of the latest added Node (135 and 315 degrees)
   * 
   * @returns Node[]
   */
  getLatestAddedNodeDiagonalConnections135_315() {
    try {

      let diagonalConnections135: Node[] = this.getLatestAddedNodeDiagonalConnections135();
      let diagonalConnections315: Node[] = this.getLatestAddedNodeDiagonalConnections315();

      const diagonalConnections = [...diagonalConnections135, ...diagonalConnections315];

      return diagonalConnections;

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  /**
   * Gets the digonal connections of the latest added Node (315 degree)
   * 
   * @returns Node[]
   */
  getLatestAddedNodeDiagonalConnections315(): Node[] {
    try {

      let connections: Node[] = [];
      let continueCounting: boolean = true;
      let nextNodeColumn: number = this.latestAddedNode.column - 1;
      let nextNodeRow: number = this.latestAddedNode.row + 1;

      while (continueCounting) {

        if (nextNodeRow < this.boardRows && nextNodeColumn >= 0) {
          if (this.boardTable[nextNodeRow][nextNodeColumn].backgroundColor === this.latestAddedNode.backgroundColor) {
            connections.push(this.boardTable[nextNodeRow][nextNodeColumn]);
            nextNodeRow++;
            nextNodeColumn--;
          } else {
            continueCounting = false;
          }
        } else {
          continueCounting = false;
        }

      }

      return connections;

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  /**
   * Gets the digonal connections of the latest added Node (135 degree)
   * 
   * @returns Node[]
   */
  getLatestAddedNodeDiagonalConnections135(): Node[] {
    try {

      let connections: Node[] = [];
      let continueCounting: boolean = true;
      let nextNodeColumn: number = this.latestAddedNode.column + 1;
      let nextNodeRow: number = this.latestAddedNode.row - 1;

      while (continueCounting) {

        if (nextNodeRow >= 0 && nextNodeColumn < this.boardColumns) {
          if (this.boardTable[nextNodeRow][nextNodeColumn].backgroundColor === this.latestAddedNode.backgroundColor) {
            connections.push(this.boardTable[nextNodeRow][nextNodeColumn]);
            nextNodeRow--;
            nextNodeColumn++;
          } else {
            continueCounting = false;
          }
        } else {
          continueCounting = false;
        }

      }

      return connections;

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  /**
   * Gets the digonal connections of the latest added Node (225 degree)
   * 
   * @returns Node[]
   */
  getLatestAddedNodeDiagonalConnections225(): Node[] {
    try {

      let connections: Node[] = [];
      let continueCounting: boolean = true;
      let nextNodeColumn: number = this.latestAddedNode.column + 1;
      let nextNodeRow: number = this.latestAddedNode.row + 1;

      while (continueCounting) {

        if (nextNodeRow < this.boardRows && nextNodeColumn < this.boardColumns) {
          if (this.boardTable[nextNodeRow][nextNodeColumn].backgroundColor === this.latestAddedNode.backgroundColor) {
            connections.push(this.boardTable[nextNodeRow][nextNodeColumn]);
            nextNodeRow++;
            nextNodeColumn++;
          } else {
            continueCounting = false;
          }
        } else {
          continueCounting = false;
        }

      }

      return connections;

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  /**
   * Gets the digonal connections of the latest added Node (45 degree)
   * 
   * @returns Node[]
   */
  getLatestAddedNodeDiagonalConnections45(): Node[] {
    try {

      let connections: Node[] = [];
      let continueCounting: boolean = true;
      let nextNodeColumn: number = this.latestAddedNode.column - 1;
      let nextNodeRow: number = this.latestAddedNode.row - 1;

      while (continueCounting) {

        if (nextNodeRow >= 0 && nextNodeColumn >= 0) {
          if (this.boardTable[nextNodeRow][nextNodeColumn].backgroundColor === this.latestAddedNode.backgroundColor) {
            connections.push(this.boardTable[nextNodeRow][nextNodeColumn]);
            nextNodeRow--;
            nextNodeColumn--;
          } else {
            continueCounting = false;
          }
        } else {
          continueCounting = false;
        }

      }

      return connections;

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  /**
   * Gets the digonal connections of the latest added Node (45 and 225 degrees)
   * 
   * @returns Node[]
   */
  getLatestAddedNodeDiagonalConnections45_225() {
    try {

      let diagonalConnections45: Node[] = this.getLatestAddedNodeDiagonalConnections45();
      let diagonalConnections225: Node[] = this.getLatestAddedNodeDiagonalConnections225();

      const diagonalConnections = [...diagonalConnections45, ...diagonalConnections225];

      return diagonalConnections;

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  /**
   * Gets the right and left connections of the latest added Node
   * 
   * @returns Node[]
   */
  getLatestAddedNodeHorizontalConnections() {
    try {

      let rightConnections: Node[] = this.getLatestAddedNodeRightConnections();
      let leftConnections: Node[] = this.getLatestAddedNodeLeftConnections();

      const horizontalConnections = [...leftConnections, ...rightConnections];

      return horizontalConnections;

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  /**
   * Gets the top and bottom connections of the latest added Node
   * 
   * @returns Node[]
   */
  getLatestAddedNodeVerticalConnections() {
    try {

      // There is no top connections for the latest added Node

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

      let connections: Node[] = [];
      let continueCounting: boolean = true;
      let nextNodeColumn: number = this.latestAddedNode.column;
      let nextNodeRow: number = this.latestAddedNode.row + 1;

      while (continueCounting) {

        if (nextNodeRow < this.boardRows) {
          if (this.boardTable[nextNodeRow][nextNodeColumn].backgroundColor === this.latestAddedNode.backgroundColor) {
            connections.push(this.boardTable[nextNodeRow][nextNodeColumn]);
            nextNodeRow++;
          } else {
            continueCounting = false;
          }
        } else {
          continueCounting = false;
        }

      }

      return connections;

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  /**
   * Gets the right connections of the latest added Node
   * 
   * @returns Node[]
   */
  getLatestAddedNodeRightConnections(): Node[] {
    try {

      let connections: Node[] = [];
      let continueCounting: boolean = true;
      let nextNodeColumn: number = this.latestAddedNode.column + 1;
      let nextNodeRow: number = this.latestAddedNode.row;

      while (continueCounting) {

        if (nextNodeColumn < this.boardColumns) {
          if (this.boardTable[nextNodeRow][nextNodeColumn].backgroundColor === this.latestAddedNode.backgroundColor) {
            connections.push(this.boardTable[nextNodeRow][nextNodeColumn]);
            nextNodeColumn++;
          } else {
            continueCounting = false;
          }
        } else {
          continueCounting = false;
        }

      }

      return connections;

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  /**
   * Gets the left connections of the latest added Node
   * 
   * @returns Node[]
   */
  getLatestAddedNodeLeftConnections(): Node[] {
    try {

      let connections: Node[] = [];
      let continueCounting: boolean = true;
      let nextNodeColumn: number = this.latestAddedNode.column - 1;
      let nextNodeRow: number = this.latestAddedNode.row;

      while (continueCounting) {

        if (nextNodeColumn >= 0) {
          if (this.boardTable[nextNodeRow][nextNodeColumn].backgroundColor === this.latestAddedNode.backgroundColor) {
            connections.push(this.boardTable[nextNodeRow][nextNodeColumn]);
            nextNodeColumn--;
          } else {
            continueCounting = false;
          }
        } else {
          continueCounting = false;
        }

      }

      return connections;

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
