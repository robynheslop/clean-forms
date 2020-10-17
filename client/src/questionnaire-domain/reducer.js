import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import events from "./events";

export default createReducer({
    questionnaires: [],
    errors: [],
    isLoadQuestionnairesPending: false,
    isLoadQuestionnairesSuccess: false,
    isLoadQuestionnairesFailed: false,
    isCreateQuestionnairePending: false,
    isCreateQuestionnaireSuccess: false,
    isCreateQuestionnaireFailed: false,
    isUpdateQuestionnairePending: false,
    isUpdateQuestionnaireSuccess: false,
    isUpdateQuestionnaireFailed: false,
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
            .addCase(actions.loadQuestionnaires.fulfilled, (state, { payload: { questionnaires } }) => {
                state.questionnaires.push(questionnaires);
                state.isLoadQuestionnairesPending = false;
                state.isLoadQuestionnairesSuccess = true;
            })
            .addCase(actions.loadQuestionnaires.rejected, (state, { error: { message } }) => {
                state.errors.push(message);
                state.isLoadQuestionnairesPending = false;
                state.isLoadQuestionnairesFailed = true;
            })
            .addCase(actions.createQuestionnaire.pending, (state) => {
                state.errors = [];
                state.isCreateQuestionnairePending = true;
            })
            .addCase(actions.createQuestionnaire.fulfilled, (state, { payload: { _id: id } }) => {
                state.questionnaires.push(id);
                state.isCreateQuestionnairePending = false;
                state.isCreateQuestionnaireSuccess = true;
            })
            .addCase(actions.createQuestionnaire.rejected, (state, { error: { message } }) => {
                state.errors.push(message);
                state.isCreateQuestionnairePending = false;
                state.isCreateQuestionnaireFailed = true;
            })
            .addCase(actions.updateQuestionnaire.pending, (state) => {
                state.errors = [];
                state.isUpdateQuestionnairePending = true;
            })
            .addCase(actions.updateQuestionnaire.fulfilled, (state, { payload: { questionnaire } }) => {
                // overwrite q with same id in state
                state.isUpdateQuestionnairePending = false;
                state.isUpdateQuestionnaireSuccess = true;
            })
            .addCase(actions.updateQuestionnaire.rejected, (state, { error: { message } }) => {
                state.errors.push(message);
                state.isUpdateQuestionnairePending = false;
                state.isUpdateQuestionnaireFailed = true;
            })
            .addCase(actions.deleteQuestionnaire.pending, (state) => {
                state.errors = [];
                state.isDeleteQuestionnairePending = true;
            })
            .addCase(actions.deleteQuestionnaire.fulfilled, (state, { payload: { _id: id } }) => {
                // remove q with same id in state
                state.isDeleteQuestionnaireSuccess = true;
                state.isDeleteQuestionnairePending = false;
            })
            .addCase(actions.deleteQuestionnaire.rejected, (state, { error: { message } }) => {
                state.errors.push(message);
                state.isDeleteQuestionnairePending = false;
                state.isDeleteQuestionnaireFailed = true;
            })
            .addCase(events.reset, (state) => {
                state = {
                    questionnaires: [],
                    errors: [],
                    isLoadQuestionnairesPending: false,
                    isLoadQuestionnairesSuccess: false,
                    isLoadQuestionnairesFailed: false,
                    isCreateQuestionnairePending: false,
                    isCreateQuestionnaireSuccess: false,
                    isCreateQuestionnaireFailed: false,
                    isUpdateQuestionnairePending: false,
                    isUpdateQuestionnaireSuccess: false,
                    isUpdateQuestionnaireFailed: false,
                    isDeleteQuestionnairePending: false,
                    isDeleteQuestionnaireSuccess: false,
                    isDeleteQuestionnaireFailed: false,
                }
            })
    }
)