import { createAction } from "@reduxjs/toolkit";

const events = {
    reset: createAction("clinic-domain/RESET"),
    activeClinicSelected: createAction("clinic-domain/ACTIVE_CLINIC_SELECTED"),
    activeClinicDeselected: createAction("clinic-domain/ACTIVE_CLINIC_DESELECTED")
}

export default events;