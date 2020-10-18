const selectQuestionaire = (state) => state?.bookingDomain?.questionnaire

const selectIsQuestionnaireLoading = (state) => state?.bookingDomain?.isQuestionnaireLoading

export default { 
    selectQuestionaire,
    selectIsQuestionnaireLoading
};