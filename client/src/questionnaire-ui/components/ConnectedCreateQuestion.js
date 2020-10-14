import CreateQuestion from './CreateQuestion';
import { connect } from 'react-redux';
import { actions, selectors } from "../../questionnaire-domain";

const mapDispatchToProps = dispatch => {
    const createQuestion = (formData) => {
        dispatch(actions.createQuestion(formData))
    }
    return { createQuestion }
}
export const ConnectedCreateQuestion = connect(
    state => ({
        isCreateQuestionPending: selectors.selectIsCreateQuestionPending(state),
    }),
    mapDispatchToProps)(CreateQuestion)

export default ConnectedCreateQuestion;
