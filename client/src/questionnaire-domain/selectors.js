import {find, propEq} from 'ramda';

const selectQuestionnaires = (state) => state?.questionnaireDomain?.questionnaires;

const selectQuestionnaire = (state, id) => {
    const questionnaires = selectQuestionnaires(state) || [];
    console.log('questionnaires, id', questionnaires, id)
    return find(propEq('id', id))(questionnaires || null);
}

const selectIsLoadQuestionnairesPending = (state) => state?.questionnaireDomain?.isLoadQuestionnairesPending;

const selectIsLoadQuestionnairesSuccess = (state) => state?.questionnaireDomain?.isLoadQuestionnairesSuccess;

const selectIsLoadQuestionnairesFailed = (state) => state?.questionnaireDomain?.isLoadQuestionnairesFailed;

const selectIsSaveQuestionnairePending = (state) => state?.questionnaireDomain?.isSaveQuestionnairePending;

const selectIsSaveQuestionnaireSuccess = (state) => state?.questionnaireDomain?.isSaveQuestionnaireSuccess;

const selectIsSaveQuestionnaireFailed = (state) => state?.questionnaireDomain?.isSaveQuestionnaireFailed;

const selectIsDeleteQuestionnairePending = (state) => state?.questionnaireDomain?.isDeleteQuestionnairePending;

const selectIsDeleteQuestionnaireSuccess = (state) => state?.questionnaireDomain?.isDeleteQuestionnaireSuccess;

const selectIsDeleteQuestionnaireFailed = (state) => state?.questionnaireDomain?.isDeleteQuestionnaireFailed;

export default { 
    selectQuestionnaires,
    selectQuestionnaire,
    selectIsLoadQuestionnairesSuccess,
    selectIsLoadQuestionnairesFailed,
    selectIsLoadQuestionnairesPending,
    selectIsSaveQuestionnairePending,
    selectIsSaveQuestionnaireSuccess,
    selectIsSaveQuestionnaireFailed,
    selectIsDeleteQuestionnairePending,
    selectIsDeleteQuestionnaireSuccess,
    selectIsDeleteQuestionnaireFailed,
}
