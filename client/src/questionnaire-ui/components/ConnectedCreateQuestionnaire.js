import CreateQuestionnaire from './CreateQuestionnaire';
import { connect } from 'react-redux';
import { actions, selectors } from "../../questionnaire-domain";

const mapDispatchToProps = dispatch => {
    const createQuestionnaire = (formData) => {
        dispatch(actions.createQuestionnaire(formData))
    }
    return { createQuestionnaire }
}
export const ConnectedCreateQuestionnaire = connect(
    state => ({
        questionnaires: selectors.selectQuestionnaires(state),
        isCreateQuestionnairePending: selectors.selectIsCreateQuestionnairePending(state),
        isCreateQuestionnaireSuccess: selectors.selectIsCreateQuestionnaireSuccess(state),
        isCreateQuestionnaireFailed: selectors.selectIsCreateQuestionnaireFailed(state),
    }),
    mapDispatchToProps)(CreateQuestionnaire)

export default ConnectedCreateQuestionnaire;
