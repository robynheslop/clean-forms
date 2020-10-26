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
        isAddScreeningPending: false,
        isAddScreeningSuccess: false,
        isAddScreeningFailed: false,
        isAddBookingPending: false,
        isAddBookingSuccess: false,
        isAddBookingFailed: false,
        isSendScreeningPending: false,
        isSendScreeningSuccess: false,
        isSendScreeningFailed: false,
        bookings: [],
        errors: [],
    },
    errors: [],
    isLoadClinicsPending: false,
    isAddClinicPending: false,
    isAddClinicFailed: false,
    isAddClinicSuccess: false,
    isUpdatingBookingFulfilled: false
},
    builder => {
        builder
            .addCase(actions.loadClinics.fulfilled, (state, { payload: { owner, clinics } }) => {
                state.clinics.push(...clinics);
                state.owner = owner;
                state.isLoadClinicsPending = false;
            })
            .addCase(actions.loadClinics.rejected, (state, { error: { message } }) => {
                state.errors.push(message);
                state.isLoadClinicsPending = false;
            })
            .addCase(actions.loadClinics.pending, (state) => {
                state.errors = [];
                state.clinics = [];
                state.isLoadClinicsPending = true;
            })
            .addCase(actions.addClinic.fulfilled, (state, { payload }) => {
                state.isAddClinicPending = false;
                state.isAddClinicSuccess = true;
                state.clinics.push(payload)
            })
            .addCase(actions.addClinic.rejected, (state, { error: { message } }) => {
                state.errors.push(message);
                state.isAddClinicPending = false;
                state.isAddClinicFailed = true;
            })
            .addCase(actions.addClinic.pending, (state) => {
                state.errors = [];
                state.isAddClinicPending = true;
                state.isAddClinicFailed = false;
                state.isAddClinicSuccess = false;
            })
            .addCase(events.reset, (state) => {
                state.clinics = [];
                state.owner = undefined;
                state.activeClinic = {};
                state.errors = [];
                state.isLoadClinicsPending = false;
                state.isAddClinicPending = false;
                state.isAddClinicFailed = false;
                state.isAddClinicSuccess = false;
                state.isUpdatingBookingFulfilled = false;
            })
            .addCase(actions.loadBookings.pending, (state) => {
                state.activeClinic.bookings = [];
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
            .addCase(actions.createScreening.pending, (state) => {
                state.activeClinic.errors = [];
                state.activeClinic.isAddScreeningPending = true;
                state.activeClinic.isAddScreeningSuccess = false;
                state.activeClinic.isAddScreeningFailed = false;
            })
            .addCase(actions.createScreening.rejected, (state, { error: { message } }) => {
                state.activeClinic.errors.push(message);
                state.activeClinic.isAddScreeningPending = false;
                state.activeClinic.isAddScreeningFailed = true;
            })
            .addCase(actions.createScreening.fulfilled, (state) => {
                state.activeClinic.isAddScreeningPending = false;
                state.activeClinic.isAddScreeningSuccess = true;
            })
            .addCase(actions.createBooking.pending, (state) => {
                state.activeClinic.errors = [];
                state.activeClinic.isAddBookingPending = true;
                state.activeClinic.isAddBookingSuccess = false;
                state.activeClinic.isAddBookingFailed = false;
            })
            .addCase(actions.createBooking.rejected, (state, { error: { message } }) => {
                state.activeClinic.errors.push(message);
                state.activeClinic.isAddBookingPending = false;
                state.activeClinic.isAddBookingFailed = true;
            })
            .addCase(actions.createBooking.fulfilled, (state) => {
                state.activeClinic.isAddBookingPending = false;
                state.activeClinic.isAddBookingSuccess = true;
            })
            .addCase(actions.sendScreening.pending, (state) => {
                state.activeClinic.errors = [];
                state.activeClinic.isSendScreeningPending = true;
                state.activeClinic.isSendScreeningSuccess = false;
                state.activeClinic.isSendScreeningFailed = false;
            })
            .addCase(actions.sendScreening.rejected, (state, { error: { message } }) => {
                state.activeClinic.errors.push(message);
                state.activeClinic.isSendScreeningPending = false;
                state.activeClinic.isSendScreeningFailed = true;
            })
            .addCase(actions.sendScreening.fulfilled, (state) => {
                state.activeClinic.isSendScreeningPending = false;
                state.activeClinic.isSendScreeningSuccess = true;
            })
            .addCase(events.activeClinicSelected, (state, { payload: { id, clinicname, phone } }) => {
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