import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        isAdminAuthenticated: false
    },
    reducers: {
        
        setAdminAuthentication: (state, action) => {
            state.isAdminAuthenticated = action.payload;
        },
       
    }
});

export const { 
    
    setAdminAuthentication, 
   
} = adminSlice.actions;

export default adminSlice.reducer;