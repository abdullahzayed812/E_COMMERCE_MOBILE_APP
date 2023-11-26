import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  theme: "LIGHT" | "DARK";
}

const initialState: InitialState = {
  theme: "LIGHT",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<"LIGHT" | "DARK">) {
      state.theme = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;

export default themeSlice.reducer;
