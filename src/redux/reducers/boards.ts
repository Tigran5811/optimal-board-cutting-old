import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardState } from "../../interface/interface";

export const boardsSlice = createSlice({
  name: "boards",
  initialState: [] as BoardState[],
  reducers: {
    addBoard: (state, action: PayloadAction<BoardState>) => {
      state.push(action.payload);
    },
    updateBoard: (state, action: PayloadAction<{ board: BoardState }>) => {
      const { board } = action.payload;
      const { length, width, quantity, colorBoard } = board;

      state = state.map((item) => {
        if (item.colorBoard === colorBoard) {
          return {
            ...item,
            length,
            width,
            quantity,
          };
        }
        return item;
      });
      return state;
    },
    removeBoardByIndex: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.splice(+index, 1);
    },
    removeAllBoards: () => {
      return [];
    },
  },
});

export const { addBoard, updateBoard, removeBoardByIndex, removeAllBoards } =
  boardsSlice.actions;
