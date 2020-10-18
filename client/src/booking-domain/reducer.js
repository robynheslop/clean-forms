import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export default createReducer({
    errors: [],
    screening: {
        id: undefined,
        questionnaireId: undefined
    },
    questionnaire: {},
    responses: {}
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
            })
            .addCase(actions.getQuestionnaire.rejected, (state, { error: { message } }) => {
                state.errors.push(message)
            })
    }
)