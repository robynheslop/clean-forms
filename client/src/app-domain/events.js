import {createAction} from "@reduxjs/toolkit";

const events = {
    loggedOut: createAction("app-domain/LOGGED_OUT")
}

export default events;