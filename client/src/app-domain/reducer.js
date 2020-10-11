import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import events from "./events";

export default createReducer({
    session: {
        token: undefined,
        userId: undefined,
        isLoggedIn: false,
        isLogInPending: false,
        isSignUpPending: false,
        errors: []
    }}, 
    builder => {
        builder.addCase(actions.logIn.fulfilled,(state,{payload})=>{
            state.session.token = payload.token;
            state.session.userId = payload.userId;
            state.session.isLoggedIn = true;
            state.session.isLogInPending = false;
        })
        .addCase(actions.logIn.rejected, (state, {error:{message}}) => {
            state.session.errors.push(message);
            state.session.isLogInPending = false;
        })
        .addCase(actions.logIn.pending, (state) => {
            state.session.errors = [];
            state.session.isLogInPending = true;
        })
        .addCase(actions.signUp.fulfilled, (state,{payload: token})=>{
            state.session.token = token;
            state.session.isLoggedIn = true;
            state.session.isSignUpPending = false;
        })
        .addCase(actions.signUp.rejected, (state, {error:{message}}) => {
            state.session.errors.push(message);
            state.session.isSignUpPending = false;
        })
        .addCase(actions.signUp.pending, (state) => {
            state.session.errors = [];
            state.session.isSignUpPending = true;
        })
        .addCase(events.loggedOut, (state) => {
            state.session.token = undefined;
            state.session.userId = undefined;
            state.session.isLoggedIn = false;
            state.session.errors = [];
        })
    }    
)

