import { createAction } from "@reduxjs/toolkit";

const events = {
    loggedOut: createAction("app-domain/LOGGED_OUT"),
    loggedIn: createAction("app-domain/LOGGED_IN")
}

export default events;