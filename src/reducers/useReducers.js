import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { GET } from '../utilities/ApiProvider'
import Cookies from 'js-cookie'
import { act } from "react-dom/test-utils";

// Basic Global State
const initialState = {};

// Function For Request Handling For State Update
export const fetchUserName = createAsyncThunk(
    'fetchuser',
    async () => {
        const response = await GET(`https://jsonplaceholder.typicode.com/users`)
        return {name: response[Math.floor(Math.random()*10)].name};
    }
)

// State Updating Functions
const userReducer = createSlice({
    name:'person',
    initialState,
    reducers:{
        updateName: (state, action)=>{
            state.value = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload))
            Cookies.set('user', JSON.stringify(action.payload))
        },
        loadUser: (state, action) => {
            state.value = action.payload;
        },
        customerData:(state,action)=>{
            state.value = action.payload;
            localStorage.setItem('customers',JSON.stringify(action.payload));
        },
        // loadLocalStorage: (state, action) => {
        //     state.value = action.payload;
        //     localStorage.setItem('user', JSON.stringify(action.payload))
        // },
        // loadCookies: (state, action) => {
        //     state.value = action.payload;
        //     Cookies.set('user', JSON.stringify(action.payload))
        // },
        logout: (state, action) => {
            localStorage.clear();
            Cookies.remove('user');
            state.value = {};
        }
    },
    extraReducers:{
        [fetchUserName.fulfilled]: (state, action) => {
            state.value = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
            Cookies.set('user', JSON.stringify(action.payload))
        },
        [fetchUserName.pending]: state => {
            state.value = {name: 'Loading...'}
        },
        [fetchUserName.rejected]: state => {
            state.value = {name: 'Try Again!'}
        },
    }
})

// Exporting All the State Updating Functions
export const { updateName, loadUser, loadLocalStorage,customerData, loadCookies, logout } = userReducer.actions
export default userReducer.reducer
