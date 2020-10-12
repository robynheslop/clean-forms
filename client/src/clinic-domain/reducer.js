import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import events from "./events";

export default createReducer({
    clinics: [],
    errors: [],
    isGettingClinicsPending: false,
    isAddingClinicPending: false
},
    builder => {
        builder
            .addCase(actions.getClinics.fulfilled, (state, { payload: clinics }) => {
                state.clinics.push(clinics);
                state.isGetClinicsPending = false;
            })
            .addCase(actions.getClinics.rejected, (state, { error: { message } }) => {
                state.errors.push(message);
                state.isGettingClinicsPending = false;
            })
            .addCase(actions.getClinics.pending, (state) => {
                state.errors = [];
                state.clinics = [];
                state.isGettingClinicsPending = true;
            })
            .addCase(actions.addClinic.fulfilled, (state, { payload }) => {
                state.isAddingClinicPending = false;
                state.clinics.push(payload)
            })
            .addCase(actions.addClinic.rejected, (state, { error: { message } }) => {
                state.errors.push(message);
                state.isAddingClinicPending = false;
            })
            .addCase(actions.addClinic.pending, (state) => {
                state.errors = [];
                state.isAddingClinicPending = true;
            })
            .addCase(events.loggedOut, (state) => {
                state.clinics = [];
                state.errors = [];
            })
    }
)