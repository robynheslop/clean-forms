import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import events from "./events";

export default createReducer({
    session: {
        clinics: [],
        errors: [],
        isGettingClinicsPending: false,
        isAddingClinicPending: false
    }
},
    builder => {
        builder
            .addCase(actions.getClinics.fulfilled, (state, { payload: clinics }) => {
                state.session.clinics.push(clinics);
                state.session.isGetClinicsPending = false;
            })
            .addCase(actions.getClinics.rejected, (state, { error: { message } }) => {
                state.session.errors.push(message);
                state.session.isGettingClinicsPending = false;
            })
            .addCase(actions.getClinics.pending, (state) => {
                state.session.errors = [];
                state.session.clinics = [];
                state.session.isGettingClinicsPending = true;
            })
            .addCase(actions.addClinic.fulfilled, (state, { payload }) => {
                state.session.isAddingClinicPending = false;
                state.session.clinics.push(payload)
            })
            .addCase(actions.addClinic.rejected, (state, { error: { message } }) => {
                state.session.errors.push(message);
                state.session.isAddingClinicPending = false;
            })
            .addCase(actions.addClinic.pending, (state) => {
                state.session.errors = [];
                state.session.isAddingClinicPending = true;
            })
    }
)