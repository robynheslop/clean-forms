import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import events from "./events";

export default createReducer({
    clinics: [],
    owner: undefined,
    activeClinic: {
        id: undefined,
        clinicname: undefined,
        phone: undefined,
        isLoadBookingsPending: false,
        isAddBookingPending: false,
        isAddingBookingSuccess: false,
        isAddingBookingFailed: false,
        bookings: [],
        errors: [],
    },
    errors: [],
    isLoadClinicsPending: false,
    isAddClinicPending: false,
    isUpdatingBookingFulfilled: false
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
                state.activeClinic.isAddingBookingSuccess = false;
                state.activeClinic.isAddingBookingFailed = false;
            })
            .addCase(actions.addBooking.rejected, (state, { error: { message } }) => {
                state.activeClinic.errors.push(message);
                state.activeClinic.isAddBookingPending = false;
                state.activeClinic.isAddingBookingFailed = true;
            })
            .addCase(actions.addBooking.fulfilled, (state) => {
                state.activeClinic.errors = [];
                state.activeClinic.isAddBookingPending = false;
                state.activeClinic.isAddingBookingSuccess = true;
            })
            .addCase(events.activeClinicSelected, (state, { payload: {id, clinicname, phone} }) => {
                console.log('id, clinicname, phone', id, clinicname, phone)
                state.activeClinic.id = id;
                state.activeClinic.clinicname = clinicname;
                state.activeClinic.phone = phone;
            })
            .addCase(events.activeClinicDeselected, (state) => {
                state.activeClinic.id = undefined;
            })
            .addCase(actions.updateBookingStatus.fulfilled, (state) => {
                state.isUpdatingBookingFulfilled = true;
            })

    }
)