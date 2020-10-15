import CreateQuestionnaire from './CreateQuestionnaire';
import { connect } from 'react-redux';
import { actions, selectors } from "../../questionnaire-domain";

const mapDispatchToProps = dispatch => {
    const createQuestionnaire = (formData) => {
        dispatch(actions.createQuestionnaire(formData))
    }
    const deleteQuestionnaire = (_id) => {
        dispatch(actions.deleteQuestionnaire(_id))
    }
    const updateQuestionnaire = (formData) => {
        dispatch(actions.updateQuestionnaire(formData))
    }
    return { createQuestionnaire, updateQuestionnaire, deleteQuestionnaire }
}
export const ConnectedCreateQuestionnaire = connect(
    state => ({
        questionnaires: selectors.selectQuestionnaires(state),
        isCreateQuestionnairePending: selectors.selectIsCreateQuestionPending(state),
        isCreateQuestionnaireSuccess: selectors.selectIsCreateQuestionnaireSuccess(state),
        isCreateQuestionnaireFailed: selectors.selectIsCreateQuestionnaireFailed(state),
        isDeleteQuestionnairePending: selectors.selectIsDeleteQuestionPending(state),
        isDeleteQuestionnaireSuccess: selectors.selectIsDeleteQuestionnaireSuccess(state),
        isDeleteQuestionnaireFailed: selectors.selectIsDeleteQuestionnaireFailed(state),
        isUpdateQuestionnairePending: selectors.selectIsUpdateQuestionPending(state),
        isUpdateQuestionnaireSuccess: selectors.selectIsUpdateQuestionnaireSuccess(state),
        isUpdateQuestionnaireFailed: selectors.selectIsUpdateQuestionnaireFailed(state),
        isLoadQuestionnairePending: selectors.selectIsLoadQuestionPending(state),
        isLoadQuestionnaireSuccess: selectors.selectIsLoadQuestionnaireSuccess(state),
        isLoadQuestionnaireFailed: selectors.selectIsLoadQuestionnaireFailed(state),
    }),
    mapDispatchToProps)(CreateQuestionnaire)

export default CreateQuestionnaire;
