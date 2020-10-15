import { createAsyncThunk } from '@reduxjs/toolkit';
//  import events from './events';

export const loadQuestionnaires = createAsyncThunk(
    'questionnaire-domain/LOAD_QUESTIONNAIRES',
    async ({owner}) => {
        const response = await fetch(`/api/questionnaire/${owner}`, {
            method: "GET"
        });
        const responseJson = await response.json();
        return responseJson;
    }
)

export const createQuestionnaire = createAsyncThunk(
    'questionnaire-domain/CREATE_QUESTIONNAIRE',
    async ({owner, title, preText, questions, postText}) => {
        const params = new URLSearchParams();
        // format questionnaire data
        // params.append('owner', owner);
        // params.append('title', title);
        // params.append('preText', preText);
        // params.append('questions', questions);
        // params.append('postText', postText);
        const response = await fetch(`/api/questionnaire/`, {
            method: "POST",
            body: params
        });
        const { questionnaire } = await response.json();
        return { questionnaire };
    }
)

export const updateQuestionnaire = createAsyncThunk(
    'questionnaire-domain/UPDATE_QUESTIONNAIRE',
    async ({ _id, owner, title, preText, questions, postText }) => {
        const params = new URLSearchParams();
        // format questionnaire data
        // params.append('owner', owner);
        // params.append('title', title);
        // params.append('preText', preText);
        // params.append('questions', questions);
        // params.append('postText', postText);
        const response = await fetch(`/api/questionnaire/${_id}`, {
            method: "PUT",
            body: params
        });
        const { questionnaire } = await response.json();
        return { questionnaire };
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
    createQuestionnaire,
    updateQuestionnaire,
    deleteQuestionnaire
}

export default actions;