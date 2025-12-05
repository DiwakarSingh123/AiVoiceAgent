import { createSlice } from "@reduxjs/toolkit";

const userSlicer = createSlice({
    name:"user",
    initialState:{
        userData:null,
    },
    reducers:{
        setData : (state,action)=>{
           state.userData = action.payload; 

        },
       
    }
})

export const {setData} = userSlicer.actions;

export default userSlicer.reducer;