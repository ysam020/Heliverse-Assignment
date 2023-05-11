import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./redux/reducers/rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});
