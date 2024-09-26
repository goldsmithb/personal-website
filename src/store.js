import { configureStore } from "@reduxjs/toolkit";
import solifaireReducer from "./components/solifaire/solifaireSlice.js";

export default configureStore({
  reducer: {
    solifaire: solifaireReducer,
  },
});
