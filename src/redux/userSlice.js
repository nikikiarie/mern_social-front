import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    eerror: false,
 
    
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    isLoading: (state) => {
      state.loading = true;

    },
    isError: (state) => {
      state.loading=false

        state.eerror = true
        
        
    },
    logOut:(state)=>{
      console.log({...state})
      state.user = null
      
 
    },
    getFriends:(state,action)=>{
      console.log(action)
      state.user.friends = action.payload
    }
  },
});

export const {addUser,isLoading,isError,logOut,getFriends} = userSlice.actions

export default userSlice.reducer

