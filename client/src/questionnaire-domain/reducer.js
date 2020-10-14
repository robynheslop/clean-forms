import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import events from "./events";

export default createReducer({
    questionnaires =[],
    errors: [],
    isCreateQuestionPending: false,
    isCreateQuestionSuccess: false,
    isCreateQuestionFailed: false,
    isCreateQuestionnairePending: false,
    isCreateQuestionnaireSuccess: false,
    isCreateQuestionnaireFailed: false,
},
    builder => {
        builder
            .addCase(actions.createQuestion.pending, (state) => {
                state.errors = [];
                state.isCreateQuestionPending = true;
            })
            .addCase(actions.createQuestion.fulfilled, (state, { payload: { _id: id } }) => {
                state.questions.push(id);
                state.isCreateQuestionPending = false;
                state.isCreateQuestionSuccess = true;
            })
            .addCase(actions.createQuestion.rejected, (state, { error: { message } }) => {
                state.errors.push(message);
                state.isCreateQuestionPending = false;
                state.isCreateQuestionFailed = true;
            })
            .addCase(actions.createQuestionnaire.pending, (state) => {
                state.errors = [];
                state.isCreateQuestionnairePending = true;
            })
            .addCase(actions.createQuestionnaire.fulfilled, (state, { payload: { _id: id } }) => {
                state.questions.push(id);
                state.isCreateQuestionnairePending = false;
                state.isCreateQuestionnaireSuccess = true;
            })
            .addCase(actions.createQuestionnaire.rejected, (state, { error: { message } }) => {
                state.errors.push(message);
                state.isCreateQuestionnairePending = false;
                state.isCreateQuestionnaireFailed = true;
            })
            .addCase(events.reset, (state) => {
                state = {
                    questionnaires =[],
                    errors: [],
                    isCreateQuestionPending: false,
                    isCreateQuestionSuccess: false,
                    isCreateQuestionFailed: false,
                    isCreateQuestionnairePending: false,
                    isCreateQuestionnaireSuccess: false,
                    isCreateQuestionnaireFailed: false,
                }
            })
    }
)