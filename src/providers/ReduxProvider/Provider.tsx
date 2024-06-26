import { store } from "@/redux";
import React, { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";

function Provider({ children }: { children: ReactNode }) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}

export default Provider;
