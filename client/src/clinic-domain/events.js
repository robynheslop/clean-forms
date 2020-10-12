import { createAction } from "@reduxjs/toolkit";

const events = {
    loggedOut: createAction("clinic-domain/LOGGED_OUT"),
}

export default events;