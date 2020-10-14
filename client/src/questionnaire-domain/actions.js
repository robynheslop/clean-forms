import { createAsyncThunk } from '@reduxjs/toolkit';
import events from './events';

export const loadQuestionnaires = createAsyncThunk(
    'questionnaire-domain/LOAD_QUESTIONNAIRES',
    async ({owner}) => {
        const response = await fetch(`/api/questionnaires/${owner}`, {
            method: "GET"
        });
        const responseJson = await response.json();
        const questionnaires = responseJson.map(questionnaire => {
            return {
                id: questionnaire._id,
                title: questionnaire.title,
                pretext: questionnaire.pretext,
                questions: questionnaire.questions,
                postText: questionnaire.postText
            }
        });
        return { questionnaires };
    }
)

// export const createQuestion = createAsyncThunk(
//     'questionnaire-domain/CREATE_QUESTION',
//     async ({query, questionType, responseOptions, correctOption}) => {
//         const params = new URLSearchParams();
//         params.append('query', query);
//         params.append('questionType', questionType);
//         params.append('responseOptions', responseOptions);
//         params.append('correctOption', correctOption);
//         const response = await fetch(`/api/questionnaire/create-question`, {
//             method: "POST",
//             body: params
//         });
//         const { _id } = await response.json();
//         return { _id };
//     }
// )

export const createQuestionnaire = createAsyncThunk(
    'questionnaire-domain/CREATE_QUESTION',
    async ({owner, title, preText, questions, postText}) => {
        const params = new URLSearchParams();
        params.append('owner', owner);
        params.append('title', title);
        params.append('preText', preText);
        params.append('questions', questions);
        params.append('postText', postText);
        const response = await fetch(`/api/questionnaire/create-questionnaire`, {
            method: "POST",
            body: params
        });
        const { questionnaire } = await response.json();
        return { questionnaire };
    }
)

const actions = {
    loadQuestionnaires,
    createQuestionnaire
}

export default actions;