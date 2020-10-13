import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import events from "./events";

export default createReducer({
    clinics: [],
    owner: undefined,
    activeClinic: {
        id: undefined,
        isLoadBookingsPending: false,
        isAddBookingPending: false,
        bookings: [],
        errors: [],
    },
    errors: [],
    isLoadClinicsPending: false,
    isAddClinicPending: false,
},
    builder => {
        builder
            .addCase(actions.loadClinics.fulfilled, (state, { payload: { owner, clinics } }) => {
                state.clinics.push(...clinics);
                state.owner = owner;
                state.isGetClinicsPending = false;
            })
            .addCase(actions.loadClinics.rejected, (state, { error: { message } }) => {
                state.errors.push(message);
                state.isGettingClinicsPending = false;
            })
            .addCase(actions.loadClinics.pending, (state) => {
                state.errors = [];
                state.clinics = [];
                state.isGettingClinicsPending = true;
            })
            .addCase(actions.addClinic.fulfilled, (state, { payload }) => {
                state.isAddClinicPending = false;
                state.clinics.push(payload)
            })
            .addCase(actions.addClinic.rejected, (state, { error: { message } }) => {
                state.errors.push(message);
                state.isAddClinicPending = false;
            })
            .addCase(actions.addClinic.pending, (state) => {
                state.errors = [];
                state.isAddClinicPending = true;
            })
            .addCase(events.reset, (state) => {
                state = {
                    clinics: [],
                    owner: undefined,
                    activeClinic: {
                        id: undefined,
                        isLoadBookingsPending: false,
                        isAddBookingPending: false,
                        bookings: [],
                        errors: [],
                    },
                    errors: [],
                    isLoadClinicsPending: false,
                    isAddClinicPending: false,
                }
            })
            .addCase(actions.loadBookings.pending, (state) => {
                state.activeClinic.bookings = []
                state.activeClinic.errors = [];
                state.activeClinic.isLoadBookingsPending = true;
            })
            .addCase(actions.loadBookings.rejected, (state, { error: { message } }) => {
                state.activeClinic.errors.push(message);
                state.activeClinic.isLoadBookingsPending = false;
            })
            .addCase(actions.loadBookings.fulfilled, (state, { payload: bookings }) => {
                state.activeClinic.bookings.push(...bookings);
                state.activeClinic.isLoadBookingsPending = false;
            })
            .addCase(actions.addBooking.pending, (state) => {
                state.activeClinic.errors = [];
                state.activeClinic.isAddBookingPending = true;
            })
            .addCase(actions.addBooking.rejected, (state, { error: { message } }) => {
                state.activeClinic.errors.push(message);
                state.activeClinic.isAddBookingPending = false;
            })
            .addCase(actions.addBooking.fulfilled, (state) => {
                state.activeClinic.errors = [];
                state.activeClinic.isAddBookingPending = false;
            })
            .addCase(events.activeClinicSelected, (state, { payload: clinicId }) => {
                state.activeClinic.id = clinicId;
            })
            .addCase(events.activeClinicDeselected, (state) => {
                state.activeClinic.id = undefined;
            })

    }
)