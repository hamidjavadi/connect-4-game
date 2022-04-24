export type Node = {
    col: number,
    row: number,
    status: NodeStatus
}

export enum NodeStatus {
    Empty = 0,
    Filled = 1
}

export type Player = {
    name: string,
    color: Color
}

export enum Color {
    Yellow = "#0ff"
}