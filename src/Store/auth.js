import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialAuthState = {
  user: Cookies.get("token") || '',
  id: Cookies.get("id") || ''
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.user = Cookies.get("token");
    },
    setSchoolId(state){
      state.id = Cookies.get('id')
    },
  
    logout(state) {
      state.user = false;
      state.id = false;
    },
    
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;