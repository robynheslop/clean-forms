import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import events from './events';

export default createReducer({
    errors: [],
    screening: {
        id: undefined,
        questionnaireId: undefined,
        status: undefined,
        responses: [],
    },
    questionnaire: {},
    isQuestionnaireLoading: true,
    isCompleteScreeningPending: false,
    isCompleteScreeningFulfilled: false
},
    builder => {
        builder
            .addCase(actions.getScreening.pending, (state) => {
                state.errors = [];
                state.screening.id = undefined;
                state.screening.questionnaireId = undefined;
            })
            .addCase(actions.getScreening.fulfilled, (state, { payload }) => {
                state.screening.id = payload._id;
                state.screening.status = payload.status;
                state.screening.questionnaireId = payload.questionnaire;
            })
            .addCase(actions.getScreening.rejected, (state, { error: { message } }) => {
                state.errors.push(message)
            })
            .addCase(actions.getQuestionnaire.pending, (state) => {
                state.errors = [];
                state.questionnaire = {};
            })
            .addCase(actions.getQuestionnaire.fulfilled, (state, { payload }) => {
                state.questionnaire = payload;
                state.isQuestionnaireLoading = false;
            })
            .addCase(actions.getQuestionnaire.rejected, (state, { error: { message } }) => {
                state.errors.push(message);
                state.isQuestionnaireLoading = false;
            })
            .addCase('booking-domain/SAVE_SCREENING', (state, { payload: { responsesState } }) => {
                state.screening.responses.push(responsesState)
            })
            .addCase('booking-domain/SET_STATUS', (state, { payload: { status } }) => {
                console.log('status',status)
                state.screening.status = status
            })
            .addCase(actions.completeScreening.pending, (state) => {
                state.isCompleteScreeningPending = true;
            })
            .addCase(actions.completeScreening.fulfilled, (state) => {
                state.isCompleteScreeningFulfilled = true;
            })
    }
)