import { createAsyncThunk } from '@reduxjs/toolkit';
import events from "./events";

export const logIn = createAsyncThunk(
    'app-domain/LOG_IN',
    async ({username, password}) => {
        console.log(username, password);
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        const response = await fetch("/api/login", {
            method: "POST",
            body: params
        })
        const responseJson = await response.json();
        const { token, userId } = responseJson;
        console.log(token, userId);
        return { token, userId }; 
    }
)

export const signUp = createAsyncThunk(
    "app-domain/SIGN_UP",
    async ({username, password}) => {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        const response = await fetch("/api/signup", {
            method: "POST",
            body: params
        })
        const responseJson = await response.json();
        const { token, userId } = responseJson;
        return { token, userId }; 
    }
)

export const logOut = () => (dispatch) => {
    dispatch(events.loggedOut());
}

const actions = {
    logIn,
    signUp,
    logOut
}

export default actions