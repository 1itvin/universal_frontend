import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IUser from "../../shared/interfaces/user";

interface IAuthState {
  user: IUser | null;
}

interface ITokens {
  token: string;
}

const initialState: IAuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUser | null>) => {
      state.user = payload;
    },
    setTokens: (_, { payload }: PayloadAction<ITokens>) => {
      localStorage.setItem("accessToken", payload.token);
    },
    signOut: (state) => {
      state.user = null;
      localStorage.setItem("accessToken", "");
    },
  },
});
export const { setUser, setTokens, signOut } = authSlice.actions;
export default authSlice.reducer;
