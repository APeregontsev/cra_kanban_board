import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { id: number; name: string } = { id: 0, name: "" };

const selectedBoardSlice = createSlice({
  name: "selectedBoard",
  initialState,
  reducers: {
    selectBoard(state, action: PayloadAction<{ id: number; name: string }>) {
      state = action.payload;
      return state;
    },
  },
});

// это actions условно generators
export const { selectBoard } = selectedBoardSlice.actions;

// это reducer
export default selectedBoardSlice.reducer;
