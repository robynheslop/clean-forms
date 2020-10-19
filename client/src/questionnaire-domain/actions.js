import { createAsyncThunk } from '@reduxjs/toolkit';
//  import events from './events';

export const loadQuestionnaires = createAsyncThunk(
    'questionnaire-domain/LOAD_QUESTIONNAIRES',
    async ({ owner }) => {
        const response = await fetch(`/api/questionnaires/${owner}`, {
            method: "GET"
        });
        const responseJson = await response.json();
        return responseJson;
    }
)

export const saveQuestionnaire = createAsyncThunk(
    'questionnaire-domain/CREATE_QUESTIONNAIRE',
    async ({ owner, id, title, preText, questions, postText }) => {
        const response = await fetch(`/api/questionnaire/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ owner, id, title, preText, questions, postText })
        });
        const returnedQuestionnaire = await response.json();
        return returnedQuestionnaire;
    }
)

export const deleteQuestionnaire = createAsyncThunk(
    'questionnaire-domain/DELETE_QUESTIONNAIRE',
    async ({ id }) => {
        const response = await fetch(`/api/questionnaire/${id}`, {
            method: "DELETE"
        });
        const { _id } = await response.json();
        return { _id };
    }
)

const actions = {
    loadQuestionnaires,
    saveQuestionnaire,
    deleteQuestionnaire
}

export default actions;