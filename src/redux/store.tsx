import { configureStore } from "@reduxjs/toolkit";

/**
 * @description the redux store
 * @namespace store
 */
const store = configureStore({
  reducer: {},
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
