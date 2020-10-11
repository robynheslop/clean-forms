import { createAsyncThunk } from '@reduxjs/toolkit';
// import events from "./events";

export const getClinics = createAsyncThunk(
    "clinic-domain/GET_CLINICS",
    async (props) => {
        const params = new URLSearchParams();
        params.append('owner', props.owner);

        const response = await fetch(`/api/clinics/${props.owner}`, {
            method: "GET"
        });

        const responseJson = await response.json();
        const mappedClinics = responseJson.map(clinic => {
            return {
                id: clinic._id,
                owner: clinic.owner,
                clinicname: clinic.clinicname,
                email: clinic.email,
                phone: clinic.phone
            }
        })
        console.log("mapped", mappedClinics);
        return mappedClinics;
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
        // const mappedClinics = responseJson.map(clinic => {
        //     return {
        //         id: clinic._id,
        //         owner: clinic.owner,
        //         clinicname: clinic.clinicname,
        //         email: clinic.email,
        //         phone: clinic.phone
        //     }
        // })
        // console.log("mapped", mappedClinics);
        return responseJson;
    }
)

const actions = {
    getClinics,
    addClinic
}

export default actions;