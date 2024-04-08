import { createSlice } from "@reduxjs/toolkit";

import { IAuthSliceInitialState } from "./interfaces";

const initialStateForUi: IAuthSliceInitialState = {
  token: null,
};
/**
 * @namespace authSlice
 * @description the ui slice that have all golbal ui states like lang, dir ,theme, display type , loading ,errors ..etc
 */

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateForUi,
  reducers: {
    Reset: () => ({ ...initialStateForUi }),
  },
});

export const authReducer = authSlice.reducer;
export const AuthSliceActions = authSlice.actions;
