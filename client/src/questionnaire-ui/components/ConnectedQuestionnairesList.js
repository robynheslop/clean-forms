import QuestionnairesList from './QuestionnairesList';
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
export const ConnectedQuestionnairesList = connect(
    state => ({
        questionnaires: selectors.selectQuestionnaires(state),
        isDeleteQuestionnairePending: selectors.selectIsDeleteQuestionnairePending(state),
        isDeleteQuestionnaireSuccess: selectors.selectIsDeleteQuestionnaireSuccess(state),
        isDeleteQuestionnaireFailed: selectors.selectIsDeleteQuestionnaireFailed(state),
        isLoadQuestionnairePending: selectors.selectIsLoadQuestionnairesPending(state),
        isLoadQuestionnaireSuccess: selectors.selectIsLoadQuestionnairesSuccess(state),
        isLoadQuestionnaireFailed: selectors.selectIsLoadQuestionnairesFailed(state),
    }),
    mapDispatchToProps)(QuestionnairesList)

export default ConnectedQuestionnairesList;
