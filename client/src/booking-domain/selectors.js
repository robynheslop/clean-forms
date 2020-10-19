const selectQuestionaire = (state) => state?.bookingDomain?.questionnaire;

const selectIsQuestionnaireLoading = (state) => state?.bookingDomain?.isQuestionnaireLoading

const selectScreeningId = (state) => state?.bookingDomain?.screening?.id

const selectScreeningResponses = (state) => state?.bookingDomain?.screening?.responses

const selectScreeningStatus = (state) => state?.bookingDomain?.screening?.status

const selectIsCompleteScreeningFulfilled = (state) => state?.bookingDomain?.isCompleteScreeningFulfilled

export default { 
    selectQuestionaire,
    selectIsQuestionnaireLoading,
    selectScreeningStatus,
    selectScreeningResponses,
    selectScreeningId,
    selectIsCompleteScreeningFulfilled
};