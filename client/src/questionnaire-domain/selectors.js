const selectQuestionnaires = (state) => state?.questionnaireDomain?.questionnaires

const selectIsLoadQuestionnairesPending = (state) => state?.questionnaireDomain?.isLoadQuestionnairesPending;

const selectIsLoadQuestionnairesSuccess = (state) => state?.questionnaireDomain?.isLoadQuestionnairesSuccess;

const selectIsLoadQuestionnairesFailed = (state) => state?.questionnaireDomain?.isLoadQuestionnairesFailed;

const selectIsCreateQuestionnairePending = (state) => state?.questionnaireDomain?.isCreateQuestionnairePending;

const selectIsCreateQuestionnaireSuccess = (state) => state?.questionnaireDomain?.isCreateQuestionnaireSuccess;

const selectIsCreateQuestionnaireFailed = (state) => state?.questionnaireDomain?.isCreateQuestionnaireFailed;

const selectIsUpdateQuestionnairesPending = (state) => state?.questionnaireDomain?.isUpdateQuestionnairesPending;

const selectIsUpdateQuestionnairesSuccess = (state) => state?.questionnaireDomain?.isUpdateQuestionnairesSuccess;

const selectIsUpdateQuestionnairesFailed = (state) => state?.questionnaireDomain?.isUpdateQuestionnairesFailed;

const selectIsDeleteQuestionnairePending = (state) => state?.questionnaireDomain?.isDeleteQuestionnairePending;

const selectIsDeleteQuestionnaireSuccess = (state) => state?.questionnaireDomain?.isDeleteQuestionnaireSuccess;

const selectIsDeleteQuestionnaireFailed = (state) => state?.questionnaireDomain?.isDeleteQuestionnaireFailed;

export default { 
    selectQuestionnaires,
    selectIsLoadQuestionnairesSuccess,
    selectIsLoadQuestionnairesFailed,
    selectIsLoadQuestionnairesPending,
    selectIsCreateQuestionnairePending,
    selectIsCreateQuestionnaireSuccess,
    selectIsCreateQuestionnaireFailed,
    selectIsUpdateQuestionnairesSuccess,
    selectIsUpdateQuestionnairesFailed,
    selectIsUpdateQuestionnairesPending,
    selectIsDeleteQuestionnairePending,
    selectIsDeleteQuestionnaireSuccess,
    selectIsDeleteQuestionnaireFailed,
}
