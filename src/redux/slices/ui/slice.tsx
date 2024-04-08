import { createSlice } from "@reduxjs/toolkit";
import {
  ChangeDisplay,
  ChangeLanguage,
  ChangeTheme,
  SetFCMtoken,
  SetLoading,
} from "./actions";
import { InitialStateUiInterface } from "./interfaces";

const initialStateForUi: InitialStateUiInterface = {
  disaplay: "isDesktop ",
  language: "en",
  theme: "purple",
  direction: "ltr",
  loading: false,
  FCMtoken: null,
};
/**
 * @namespace uiSlice
 * @description the ui slice that have all golbal ui states like lang, dir ,theme, display type , loading ,errors ..etc
 */

const uiSlice = createSlice({
  name: "UI",
  initialState: initialStateForUi,
  reducers: {
    Reset: () => ({ ...initialStateForUi }),
    ChangeDisplay,
    ChangeLanguage,
    ChangeTheme,
    SetLoading,
    SetFCMtoken,
  },
});

export const uiReducer = uiSlice.reducer;
export const UiSliceActions = uiSlice.actions;
