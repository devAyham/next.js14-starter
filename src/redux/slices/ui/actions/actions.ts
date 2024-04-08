import { PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/src/internal";
import { InitialStateUiInterface } from "../interfaces";
import { DisplayTypes } from "@/types/display.types";
import { LanguageTypes } from "@/types/language.types";

const ChangeDisplay = (
  state: WritableDraft<InitialStateUiInterface>,
  action: PayloadAction<DisplayTypes>
) => {
  state.disaplay = action.payload;
};
const ChangeLanguage = (
  state: WritableDraft<InitialStateUiInterface>,
  action: PayloadAction<LanguageTypes>
) => {
  state.language = action.payload;
  state.direction = action.payload === "ar" ? "rtl" : "ltr";
};
const ChangeTheme = (
  state: WritableDraft<InitialStateUiInterface>,
  action: PayloadAction<"purple" | "green">
) => {
  state.theme = action.payload;
};
const SetLoading = (
  state: WritableDraft<InitialStateUiInterface>,
  action: PayloadAction<boolean>
) => {
  state.loading = action.payload;
};
const SetFCMtoken = (
  state: WritableDraft<InitialStateUiInterface>,
  action: PayloadAction<string | null | false>
) => {
  state.FCMtoken = action.payload;
};

export { ChangeDisplay, ChangeLanguage, ChangeTheme, SetFCMtoken, SetLoading };
