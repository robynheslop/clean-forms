// const selectQuestions = (state) => state?.questionnaireDomain?.questions;

const selectQuestionnaires = (state) => state?.questionnaireDomain?.questionnaires

// const selectIsCreateQuestionPending = (state) => state?.questionnaireDomain?.isCreateQuestionPending;

// const selectIsCreateQuestionSuccess = (state) => state?.questionnaireDomain?.isCreateQuestionSuccess;

// const selectIsCreateQuestionFailed = (state) => state?.questionnaireDomain?.isCreateQuestionFailed;

const selectIsLoadQuestionnairesPending = (state) => state?.questionnaireDomain?.isLoadQuestionnairesPending;

const selectIsLoadQuestionnairesSuccess = (state) => state?.questionnaireDomain?.isLoadQuestionnairesSuccess;

const selectIsLoadQuestionnairesFailed = (state) => state?.questionnaireDomain?.isLoadQuestionnairesFailed;

const selectIsCreateQuestionnairePending = (state) => state?.questionnaireDomain?.isCreateQuestionnairePending;

const selectIsCreateQuestionnaireSuccess = (state) => state?.questionnaireDomain?.isCreateQuestionnaireSuccess;

const selectIsCreateQuestionnaireFailed = (state) => state?.questionnaireDomain?.isCreateQuestionnaireFailed;

export default { 
    // selectQuestions,
    // selectIsCreateQuestionFailed,
    // selectIsCreateQuestionSuccess,
    // selectIsCreateQuestionPending,
    selectQuestionnaires,
    selectIsLoadQuestionnairesSuccess,
    selectIsLoadQuestionnairesFailed,
    selectIsLoadQuestionnairesPending,
    selectIsCreateQuestionnairePending,
    selectIsCreateQuestionnaireSuccess,
    selectIsCreateQuestionnaireFailed
}
