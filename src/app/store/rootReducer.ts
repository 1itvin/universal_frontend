import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import { authApi } from "../../features/auth/authService";
import adminReducer from "../../features/admin/adminSlice";
import { adminApi } from "../../features/admin/adminService";

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  admin: adminReducer,
  [adminApi.reducerPath]: adminApi.reducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
