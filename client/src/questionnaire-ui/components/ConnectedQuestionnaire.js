import Questionnaire from './Questionnaire';
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { actions as questionDomainActions, selectors as questionDomainSelectors } from "../../questionnaire-domain";
import { selectors as appDomainSelectors } from '../../app-domain';

const mapDispatchToProps = (dispatch) => {
    const onSave = ({ owner, id, title, preText, postText, questions }) => {
        const createQuestionnaireParameters = { owner, id, title, preText, postText, questions }
        console.log('createQuestionnaireParameters', createQuestionnaireParameters);
        dispatch(questionDomainActions.saveQuestionnaire(createQuestionnaireParameters))
    }
    const onDelete = (id) => {
        dispatch(questionDomainActions.deleteQuestionnaire(id))
    }
    const onCancel = () => {

    }
    return { onSave, onDelete, onCancel }
}
export const ConnectedQuestionnaire = connect(
    (state, { location }) => {
        console.log('location', location)
        const _questionnaire =
            location.state?.id !== undefined ?
                questionDomainSelectors.selectQuestionnaire(state, location.state.id)
                : undefined;
        const questionnaire = _questionnaire === undefined || location.pathname === "/clinic/questionnaires/add-questionnaire" ? {
            id: uuidv4(),
            owner: appDomainSelectors.selectUserId(state),
            isEditing: false
        } :
            {
                ..._questionnaire,
                isEditing: true
            }
        console.log('questionnaire', questionnaire)
        return {
            ...questionnaire,
            isSaveQuestionnairePending: questionDomainSelectors.selectIsSaveQuestionnairePending(state),
            isSaveQuestionnaireSuccess: questionDomainSelectors.selectIsSaveQuestionnaireSuccess(state),
            isSaveQuestionnaireFailed: questionDomainSelectors.selectIsSaveQuestionnaireFailed(state),
        }
    },
    mapDispatchToProps)(Questionnaire)

ConnectedQuestionnaire.propTypes = {
    id: PropTypes.string,
    owner: PropTypes.string
}

ConnectedQuestionnaire.defaultProps = {

}

export default ConnectedQuestionnaire;
