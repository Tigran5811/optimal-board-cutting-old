export interface BoardState {
  length: number | string;
  width: number | string;
  quantity: number | string;
  colorBoard: string;
}

export interface RootState {
  boards: BoardState[];
}

export interface CardProps {
  removeItem: (index: number) => void;
  onUpdate: (board: BoardState) => void;
  boards: BoardState[];
}

export interface Rectangle {
  length: string | number;
  width: string | number;
  colorBoard: string;
  x: number;
  y: number;
}

export interface PackedResult {
  rectangles: Rectangle[];
}

export interface BoardStates {
  length: string | number;
  width: string | number;
  colorBoard: string;
}
