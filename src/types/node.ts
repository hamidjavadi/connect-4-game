import { BackgroundColor, TextColor } from "./colors";

export interface INode {
  column: number,
  backgroundColor: BackgroundColor,
  row: number,
  status: NodeStatus,
  text: string,
  textColor: TextColor
}

export enum NodeStatus {
  Empty = 'Empty',
  Filled = 'Filled'
}
