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
    async (id) => {
        const response = await fetch(`/api/bookings/${id}`, {
            method: "GET"
        });
        const responseJson = await response.json();
        const bookings = responseJson.map(booking => {
            return {
                id: booking._id,
                clientname: booking.clientname,
                email: booking.email,
                phone: booking.phone,
                status: booking.status,
                date: booking.date
            }
        });
        return bookings;
    }
)

export const addBooking = createAsyncThunk(
    "clinic-domain/ADD_BOOKINGS",
    async({clinic, clinicName, clinicPhone, clientName, email, phone, date, questionnaireId}) => {  
        
        /*
        create new screening
        */
        const screeningParams = new URLSearchParams();
        screeningParams.append('questionnaireId', questionnaireId);
        const screeningResponse = await fetch("/api/new-screening", { 
            method: "POST",
            body: screeningParams
        });
        const { _id: screeningId } = screeningResponse.json();

        /*
        creating new booking
        */
        const bookingParams = new URLSearchParams();
        bookingParams.append('clinic', clinic);
        bookingParams.append('clientname', clientName);
        bookingParams.append('email', email);
        bookingParams.append('phone', phone);     
        bookingParams.append('date', date);     
        bookingParams.append('screeningId', screeningId);     
        const bookingResponse = await fetch("/api/new-booking", { 
            method: "POST", 
            body: bookingParams
        })
        const bookingResponseJson = await bookingResponse.json();

       /*
       dispatch email to client 
        */
        const emailParams = new URLSearchParams();
        emailParams.append('clinicName', clinicName);
        emailParams.append('clinicPhone', clinicPhone);
        emailParams.append('clientName', clientName);
        emailParams.append('email', email);     
        emailParams.append('screeningId', screeningId);     
        const emailResponse = await fetch("/api/screening-request", { 
            method: "POST", 
            body: emailParams
        })

        return bookingResponseJson
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