import { createAsyncThunk } from '@reduxjs/toolkit';
import events from "./events";

export const createScreening = createAsyncThunk(
    "screening-domain/CREATE_SCREENING",
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
    "screening-domain/REQUEST_SCREENING",
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
    "screening-domain/GET_SCREENING",
    async ({ screeningId }) => {
        const screeningResponse = await fetch("/api/screening/" + screeningId, {
            method: "GET",
        });
        const { screening } = screeningResponse.json();
        return screening;
    }
)

export const getQuestionnaire = createAsyncThunk(
    "screening-domain/GET_QUESTIONNAIRE",
    async ({ questionnaireId }) => {
        const questionnaire = await fetch("/api/questionnaires/" + questionnaireId, {
            method: "GET",
        });
        const { questionnaireJson } = questionnaire.json();
        return questionnaireJson;
    }
)

export const completeScreening = createAsyncThunk(
    "screening-domain/COMPLETE_SCREENING",
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

const actions = {
    createScreening,
    requestScreening,
    getScreening,
    getQuestionnaire,
    completeScreening
}

export default actions;