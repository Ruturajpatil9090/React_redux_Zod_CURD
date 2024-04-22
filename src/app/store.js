import { configureStore } from "@reduxjs/toolkit";
import  userDetail  from "../features/userdetailSlice";

export const store = configureStore({
  reducer: {
    app: userDetail,
  },
});