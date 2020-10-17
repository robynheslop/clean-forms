import ManageQuestionnaires from './ManageQuestionnaires';
import { connect } from 'react-redux';
import { actions, selectors } from "../../questionnaire-domain";

const mapDispatchToProps = dispatch => {
    const deleteQuestionnaire = (_id) => {
        dispatch(actions.deleteQuestionnaire(_id))
    }
    const updateQuestionnaire = (formData) => {
        dispatch(actions.updateQuestionnaire(formData))
    }
    return { updateQuestionnaire, deleteQuestionnaire }
}
export const ConnectedManageQuestionnaires = connect(
    state => ({
        questionnaires: selectors.selectQuestionnaires(state),
        isDeleteQuestionnairePending: selectors.selectIsDeleteQuestionnairePending(state),
        isDeleteQuestionnaireSuccess: selectors.selectIsDeleteQuestionnaireSuccess(state),
        isDeleteQuestionnaireFailed: selectors.selectIsDeleteQuestionnaireFailed(state),
        isUpdateQuestionnairePending: selectors.selectIsUpdateQuestionnairePending(state),
        isUpdateQuestionnaireSuccess: selectors.selectIsUpdateQuestionnaireSuccess(state),
        isUpdateQuestionnaireFailed: selectors.selectIsUpdateQuestionnaireFailed(state),
        isLoadQuestionnairePending: selectors.selectIsLoadQuestionnairesPending(state),
        isLoadQuestionnaireSuccess: selectors.selectIsLoadQuestionnairesSuccess(state),
        isLoadQuestionnaireFailed: selectors.selectIsLoadQuestionnairesFailed(state),
    }),
    mapDispatchToProps)(ManageQuestionnaires)

export default ConnectedManageQuestionnaires;
