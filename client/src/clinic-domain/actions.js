import { createAsyncThunk } from '@reduxjs/toolkit';
import events from "./events";

export const loadClinics = createAsyncThunk(
    "clinic-domain/LOAD_CLINICS",
    async ({owner}) => {
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
    async({owner, clinicname, email, phone}) => {
        const params = new URLSearchParams();
        params.append('owner', owner);
        params.append('clinicname', clinicname);
        params.append('email', email);
        params.append('phone', phone);

        const response = await fetch("/api/new-clinic", {
            method: "POST",
            body: params
        })
        const responseJson = await response.json();
        return responseJson;
    }
)

export const loadBookings = createAsyncThunk(
    "clinic-domain/GET_BOOKINGS",
    async ({clinicId}) => {
        const response = await fetch(`/api/bookings/${clinicId}`, {
            method: "GET"
        });
        const responseJson = await response.json();
        console.log(responseJson)
        const bookings = responseJson.map(booking => {
            return {
                id: booking._id,
                clientname: booking.clientname,
                email: booking.email,
                phone: booking.phone,
                status: booking.status
            }
        });
        return bookings;
    }
)

export const addBooking = createAsyncThunk(
    "clinic-domain/ADD_BOOKINGS",
    async(props) => {
        const params = new URLSearchParams();
        params.append('clinic', 123123123);
        params.append('clientname', props.name);
        params.append('email', props.email);
        params.append('phone', props.phone);
        params.append('date', props.date);

        const request = new Request("/api/new-booking", { method: "POST", body: {
            params
        } })
        const response = await fetch(request)
        const responseJson = await response.json();
        // send email here
        console.log(responseJson)
        return responseJson;
    }
)

export const selectActiveClinic = (clinicId) => (dispatch) => {
    dispatch(events.activeClinicSelected(clinicId));
}

export const deselectActiveClinic = () => (dispatch) => {
    dispatch(events.activeClinicDeselected());
}

const actions = {
    loadClinics,
    addClinic,
    loadBookings,
    addBooking,
    selectActiveClinic,
    deselectActiveClinic
}

export default actions;