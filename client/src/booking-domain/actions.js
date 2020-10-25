import { createAsyncThunk } from '@reduxjs/toolkit';

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

export const getScreening = createAsyncThunk(
    "booking-domain/GET_SCREENING",
    async (id) => {
        console.log('id',id)
        const screeningResponse = await fetch("/api/screening/" + id, {
            method: "GET",
        });
        const screeningJson = await screeningResponse.json();
        console.log('screeningJson',screeningJson)
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

export const saveScreeningResponses = createAsyncThunk(
    "booking-domain/COMPLETE_SCREENING",
    async ({ id, responsesState: responses }, rejectWithValue) => {
        console.log(responses)
        const update = await fetch("/api/screening/" + id, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({responses})
        });
        const updateJson = await update.json();
        if(updateJson === "Could not update screening.") rejectWithValue(updateJson)
        return
    }
)


export const actions = {
    createScreening,
    saveScreeningResponses,
    getScreening,
    getQuestionnaire
}

export default actions;