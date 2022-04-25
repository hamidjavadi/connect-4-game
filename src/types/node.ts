export type Node = {
  col: number,
  row: number,
  status: NodeStatus
}

export enum NodeStatus {
  Empty = 0,
  Filled = 1
}
