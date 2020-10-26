const selectQuestionaire = (state) => state?.bookingDomain?.questionnaire;

const selectIsQuestionnaireLoading = (state) => state?.bookingDomain?.isQuestionnaireLoading

const selectIsLoadingScreeningRejected = (state) => state?.bookingDomain?.isLoadingScreeningRejected;

const selectScreeningId = (state) => state?.bookingDomain?.screening?.id

const selectScreeningResponses = (state) => state?.bookingDomain?.screening?.responses

const selectScreeningStatus = (state) => state?.bookingDomain?.screening?.status

const selectIsCompleteScreeningFulfilled = (state) => state?.bookingDomain?.isCompleteScreeningFulfilled

const selectIsCompleteScreeningRejected = (state) => state?.bookingDomain?.isCompleteScreeningRejected

export default { 
    selectQuestionaire,
    selectIsQuestionnaireLoading,
    selectScreeningStatus,
    selectScreeningResponses,
    selectScreeningId,
    selectIsCompleteScreeningFulfilled,
    selectIsCompleteScreeningRejected,
    selectIsLoadingScreeningRejected
};