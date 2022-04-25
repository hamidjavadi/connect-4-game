import { BackgroundColor, TextColor } from "./types/colors";
import { INode, NodeStatus } from "./types/node";

export class Node implements INode {

  backgroundColor: BackgroundColor = BackgroundColor.White;
  column: number = 0;
  row: number = 0;
  status: NodeStatus = NodeStatus.Empty;
  text: string = 'XX';
  textColor: TextColor = TextColor.White;

  constructor(column: number, row: number) {
    this.column = column;
    this.row = row;
  }
}
