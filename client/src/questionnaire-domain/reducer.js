import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import events from "./events";

export default createReducer({
    questionnaires: [],
    errors: [],
    isLoadQuestionnairesPending: false,
    isLoadQuestionnairesSuccess: false,
    isLoadQuestionnairesFailed: false,
    isSaveQuestionnairePending: false,
    isSaveQuestionnaireSuccess: false,
    isSaveQuestionnaireFailed: false,
    isDeleteQuestionnairePending: false,
    isDeleteQuestionnaireSuccess: false,
    isDeleteQuestionnaireFailed: false,
},
    builder => {
        builder
            .addCase(actions.loadQuestionnaires.pending, (state) => {
                state.errors = [];
                state.isLoadQuestionnairesPending = true;
            })
            .addCase(actions.loadQuestionnaires.fulfilled, (state, { payload: questionnaires }) => {
                state.questionnaires.push(...questionnaires);
                state.isLoadQuestionnairesPending = false;
                state.isLoadQuestionnairesSuccess = true;
            })
            .addCase(actions.loadQuestionnaires.rejected, (state, { error: { message } }) => {
                state.errors.push(message);
                state.isLoadQuestionnairesPending = false;
                state.isLoadQuestionnairesFailed = true;
            })
            .addCase(actions.saveQuestionnaire.pending, (state) => {
                state.errors = [];
                state.isSaveQuestionnairePending = true;
            })
            .addCase(actions.saveQuestionnaire.fulfilled, (state, { payload }) => {
                state.questionnaires.push(payload);
                state.isSaveQuestionnairePending = false;
                state.isSaveQuestionnaireSuccess = true;
            })
            .addCase(actions.saveQuestionnaire.rejected, (state, { error: { message } }) => {
                state.errors.push(message);
                state.isSaveQuestionnairePending = false;
                state.isSaveQuestionnaireFailed = true;
            })
            .addCase(actions.deleteQuestionnaire.pending, (state) => {
                state.errors = [];
                state.isDeleteQuestionnairePending = true;
            })
            .addCase(actions.deleteQuestionnaire.fulfilled, (state, { payload: { id } }) => {
                const newQuestionnaires = (state.questionnaires).filter((questionnaire) => {
                    return questionnaire.id !== id;
                })
                state.questionnaires = newQuestionnaires;
                state.isDeleteQuestionnaireSuccess = true;
                state.isDeleteQuestionnairePending = false;
            })
            .addCase(actions.deleteQuestionnaire.rejected, (state, { error: { message } }) => {
                state.errors.push(message);
                state.isDeleteQuestionnairePending = false;
                state.isDeleteQuestionnaireFailed = true;
            })
            .addCase(events.reset, (state) => {
                state.questionnaires = [];
                state.errors = [];
                state.isLoadQuestionnairesPending = false;
                state.isLoadQuestionnairesSuccess = false;
                state.isLoadQuestionnairesFailed = false;
                state.isSaveQuestionnairePending = false;
                state.isSaveQuestionnaireSuccess = false;
                state.isSaveQuestionnaireFailed = false;
                state.isDeleteQuestionnairePending = false;
                state.isDeleteQuestionnaireSuccess = false;
                state.isDeleteQuestionnaireFailed = false;

            })
    }
)