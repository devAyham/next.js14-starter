import { configureStore } from "@reduxjs/toolkit";
import { uiReducer } from "./slices";
import { authReducer } from "./slices/auth/slice";

/**
 * @description the redux store
 * @namespace store
 */
const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
