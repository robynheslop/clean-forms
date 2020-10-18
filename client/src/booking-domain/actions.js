import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

export const createScreening = createAsyncThunk(
    "booking-domain/CREATE_SCREENING",
    async ({ questionnaireId }) => {

        const screeningResponse = await fetch("/api/new-screening", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ questionnaireId })
        });
        const { _id: screeningId } = screeningResponse.json();

        return screeningId
    }
)

export const requestScreening = createAsyncThunk(
    "booking-domain/REQUEST_SCREENING",
    async ({ screeningId, clientEmail, clientName, clinicEmail, clinicPhone }) => {

        const screeningResponse = await fetch("/api/screening-request", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ screeningId, clientEmail, clientName, clinicEmail, clinicPhone })
        });
        const { screening } = screeningResponse.json();
        return screening;
    }
)

export const getScreening = createAsyncThunk(
    "booking-domain/GET_SCREENING",
    async (id) => {
        const screeningResponse = await fetch("/api/screening/" + id, {
            method: "GET",
        });
        const screeningJson = screeningResponse.json();
        return screeningJson;
    }
)

export const getQuestionnaire = createAsyncThunk(
    "booking-domain/GET_QUESTIONNAIRE",
    async (id) => {
        const questionnaireResponse = await fetch("/api/screening/questionnaire/" + id, {
            method: "GET",
        });

        const questionnaire = await questionnaireResponse.json();
        return questionnaire;
    }
)

export const submitScreening = createAsyncThunk(
    "booking-domain/COMPLETE_SCREENING",
    async ({ screeningId, responses }) => {

        // calculate pass/fail

        const update = await fetch("/api/questionnaires/" + screeningId, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ screeningId, responses })
        });
        const updateJson = update.json();
        return updateJson;
    }
)

export const saveScreening = (responsesState) => {
    return { type: "booking-domain/SAVE_SCREENING", payload: {responsesState}}
}



export const actions = {
    createScreening,
    requestScreening,
    getScreening,
    getQuestionnaire,
    submitScreening,
    saveScreening
}

export default actions;