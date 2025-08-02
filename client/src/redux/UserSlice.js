import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "userData",
  initialState: {
    name: "",
    role: "",
  },
  reducers: {
    setUserName: (state, action) => {
      state.name = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    clearUserData: (state) => {
      state.name = "";
      state.role = "";
    },
  },
});

export const { setUserName, setRole, clearUserData } = UserSlice.actions;

export default UserSlice.reducer;
