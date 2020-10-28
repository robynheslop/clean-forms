import { createAsyncThunk } from '@reduxjs/toolkit';
import events from "./events";

export const loadClinics = createAsyncThunk(
    "clinic-domain/LOAD_CLINICS",
    async ({ owner }) => {
        const response = await fetch(`/api/clinics/${owner}`, {
            method: "GET"
        });
        const responseJson = await response.json();
        const clinics = responseJson.map(clinic => {
            return {
                id: clinic._id,
                owner: clinic.owner,
                clinicName: clinic.clinicName,
                email: clinic.email,
                phone: clinic.phone
            }
        });
        return { clinics, owner };
    }
)

export const addClinic = createAsyncThunk(
    "clinic-domain/ADD_CLINIC",
    async ({ owner, clinicName, email, phone }, { rejectWithValue }) => {
        const response = await fetch("/api/new-clinic", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ owner, clinicName, email, phone })
        })
        const responseJson = await response.json();
        if (responseJson === "Could not create clinic") {
            return rejectWithValue(responseJson);
        }
        const clinic = {
            id: responseJson._id,
            owner: responseJson.owner,
            clinicName: responseJson.clinicName,
            email: responseJson.email,
            phone: responseJson.phone
        }

        return clinic;
    }
)

export const loadBookings = createAsyncThunk(
    "clinic-domain/GET_BOOKINGS",
    async (id) => {
        const response = await fetch(`/api/bookings/${id}`, {
            method: "GET"
        });
        const responseJson = await response.json();
        const bookings = responseJson.map(booking => {
            return {
                id: booking._id,
                clientName: booking.clientName,
                email: booking.email,
                phone: booking.phone,
                status: booking.status,
                date: booking.date
            }
        });
        return bookings;
    }
)

export const createScreening = createAsyncThunk(
    "clinic-domain/CREATE_SCREENING",
    async ({ questionnaireId }, rejectWithValue) => {

        const screeningResponse = await fetch("/api/new-screening", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ questionnaire: questionnaireId })
        });

        const { _id: screeningId } = await screeningResponse.json();
        if (!screeningId) {
            return rejectWithValue("Could not create screening.");
        }
        return screeningId;
    }
)

export const createBooking = createAsyncThunk(
    "clinic-domain/CREATE_BOOKING",
    async ({ clinic, clientName, email, phone, date, screeningId }, rejectWithValue) => {
        const bookingResponse = await fetch("/api/new-booking", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clinic, clientName, email, phone, date, screeningId })
        })
        const bookingResponseJson = await bookingResponse.json();
        if (bookingResponseJson === "Could not create booking.") {
            return rejectWithValue(bookingResponseJson);
        }
        return bookingResponseJson;
    }
)

export const sendScreening = createAsyncThunk(
    "clinic-domain/SEND_SCREENING",
    async ({ clinicName, clientName, email, phone, date, screeningId }, rejectWithValue) => {
        const screeningRequest = await fetch("/api/screening-request", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clientName, clinicName, phone, email, date, screeningId })
        })
        const screeningRequestJson = await screeningRequest.json();
        if (screeningRequestJson === "Could not send screening request.") {
            return rejectWithValue(screeningRequestJson);
        }
        return screeningRequestJson;
    }
)


export const updateBookingStatus = createAsyncThunk(
    "clinic-domain/UPDATE_BOOKING",
    async (props) => {
        const update = await fetch("/api/booking", {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(props)
        });
        const updateJson = update.json();
        return updateJson;
    }
)

export const selectActiveClinic = (id, clinicName, phone) => (dispatch) => {
    dispatch(events.activeClinicSelected({ id, clinicName, phone }));
}

export const deselectActiveClinic = () => (dispatch) => {
    dispatch(events.activeClinicDeselected());
}



const actions = {
    loadClinics,
    addClinic,
    loadBookings,
    createScreening,
    createBooking,
    sendScreening,
    updateBookingStatus,
    selectActiveClinic,
    deselectActiveClinic
}

export default actions;