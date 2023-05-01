import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoading: false,
    success: false,
    isAuthChecked: false,
    error: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        sendUserRequest: (state, action) => {
            state.isLoading = true;
        },
        setUser: (state, action) => {
            state.user = action.payload && 'user' in action.payload ? action.payload.user : null
            state.success = action.payload && action.payload.success
            state.isLoading = false
        },
        sendUserFailed: (state, action) => {
            state.success = false;
            state.isLoading = false;
        },
        setAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.error = action.payload
        }
    }
});

export const { setAuthChecked, setUser, sendUserRequest,  sendUserFailed, setErrorMessage} = userSlice.actions;

export default userSlice.reducer;