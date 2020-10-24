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
                clinicname: clinic.clinicname,
                email: clinic.email,
                phone: clinic.phone
            }
        });
        return { clinics, owner };
    }
)

export const addClinic = createAsyncThunk(
    "clinic-domain/ADD_CLINIC",
    async ({ owner, clinicname, email, phone }, { rejectWithValue }) => {
        const response = await fetch("/api/new-clinic", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ owner, clinicname, email, phone })
        })
        const responseJson = await response.json();
        if (responseJson === "Could not create clinic") {
            return rejectWithValue(responseJson);
        }
        return responseJson;
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
    async ({ questionnaireId }) => {

        const screeningResponse = await fetch("/api/new-screening", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ questionnaire: questionnaireId })
        });
        const { _id: screeningId } = await screeningResponse.json();
        return screeningId;
    }
)

export const createBooking = createAsyncThunk(
    "clinic-domain/CREATE_BOOKING",
    async ({ clinic, clientName, email, phone, date, screeningId }) => {
        const bookingResponse = await fetch("/api/new-booking", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clinic, clientName, email, phone, date, screeningId })
        })
        const bookingResponseJson = await bookingResponse.json();
        return bookingResponseJson
    }
)

export const sendScreening = createAsyncThunk(
    "clinic-domain/SEND_SCREENING",
    async ({ clinicName, clinicPhone, clientName, email, screeningId }) => {
        await fetch("/api/screening-request", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ clientName, clinicName, clinicPhone, email, screeningId })
        })
    }
)


export const updateBookingStatus = createAsyncThunk(
    "clinic-domain/UPDATE_BOOKING",
    async (props) => {
        console.log(props)
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

export const selectActiveClinic = (id, clinicname, phone) => (dispatch) => {
    dispatch(events.activeClinicSelected({ id, clinicname, phone }));
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