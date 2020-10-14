import { createAction } from "@reduxjs/toolkit";

const events = {
    reset: createAction("questionnaire-domain/RESET"),
}

export default events;