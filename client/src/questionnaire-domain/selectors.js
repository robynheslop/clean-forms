const selectQuestions = (state) => state?.questionnaireDomain?.questions;

const selectIsCreateQuestionPending = (state) => state?.questionnaireDomain?.isCreateQuestionPending;

const selectIsCreateQuestionSuccess = (state) => state?.questionnaireDomain?.isCreateQuestionSuccess;

const selectIsCreateQuestionFailed = (state) => state?.questionnaireDomain?.isCreateQuestionFailed;

export default { 
    selectQuestions,
    selectIsCreateQuestionFailed,
    selectIsCreateQuestionSuccess,
    selectIsCreateQuestionPending   
}
