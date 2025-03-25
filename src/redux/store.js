import { configureStore } from "@reduxjs/toolkit";
import fileExplorerReducer from "./fileExplorerSlice.js";

const store = configureStore({
  reducer: {
    fileExplorer: fileExplorerReducer,
  },
});

export default store;
