import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import IUser from "../../shared/interfaces/user";
import IRole from "../../shared/interfaces/role";

interface IAdminState {
  users: IUser[];
  currentUser: IUser | null;
  roles: IRole[];
  currentRole: IRole | null;
}

const initialState: IAdminState = {
  users: [],
  currentUser: null,
  roles: [],
  currentRole: null,
};

export const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<IUser[]>) => {
      state.users = payload;
    },
    setCurrentUser: (state, { payload }: PayloadAction<IUser | null>) => {
      state.currentUser = payload;
    },
    setRoles: (state, { payload }: PayloadAction<IRole[]>) => {
      state.roles = payload;
    },
    setCurrentRole: (state, { payload }: PayloadAction<IRole | null>) => {
      state.currentRole = payload;
    },
  },
});

export const { setUsers, setCurrentUser, setRoles, setCurrentRole } =
  adminSlice.actions;
export default adminSlice.reducer;
