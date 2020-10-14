import CreateQuestionnaire from './CreateQuestionnaire';
import { connect } from 'react-redux';
import { actions, selectors } from "../../questionnaire-domain";

const mapDispatchToProps = dispatch => {
    const createQuestionnaire = (formData) => {
        dispatch(actions.createQuestionnaire(formData))
    }
    return { createQuestionnaire }
}
export const CreateQuestionnaire = connect(
    state => ({
        isCreateQuestionnairePending: selectors.selectIsCreateQuestionPending(state),
        questions: selectors.selectQuestions(state)
    }),
    mapDispatchToProps)(CreateQuestionnaire)

export default ConnectedCreateQuestionnaire;