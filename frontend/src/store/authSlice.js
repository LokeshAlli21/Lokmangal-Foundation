import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: false,
    userData: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            // console.log('data got successfully: ');
            // console.log(action);
            
            state.status = true
            state.userData = action.payload
            // console.log("see state: ");
            // console.log(state.userData);
            
        },
        logout: (state, action) => {
            state.status = false
            state.userData = null
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer