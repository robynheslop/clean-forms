import Questionnaire from './Questionnaire';
import PropTypes from "prop-types";
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { actions as questionDomainActions, selectors as questionDomainSelectors } from "../../questionnaire-domain";
import { selectors as appDomainSelectors } from '../../app-domain';

const mapDispatchToProps = (dispatch, {id}) => {
    const onSave = ({ owner, title, preText, postText, questions }) => {
        const createQuestionnaireParameters = { owner, id, title, preText, postText, questions }
        console.log('createQuestionnaireParameters', createQuestionnaireParameters);
        dispatch(questionDomainActions.saveQuestionnaire(createQuestionnaireParameters))
    }
    const onDelete = () => {
        dispatch(questionDomainActions.deleteQuestionnaire(id))
    }
    const onCancel = () => {

    }
    return { onSave, onDelete, onCancel }
}
export const ConnectedQuestionnaire = connect(
    (state, { id }) => {
        const _questionnaire = questionDomainSelectors.selectQuestionnaire(state, id)
        const questionnaire = _questionnaire === undefined ? {owner: appDomainSelectors.selectUserId(state)} : _questionnaire
        return {
            ...questionnaire,
            isSaveQuestionnairePending: questionDomainSelectors.selectIsSaveQuestionnairePending(state),
            isSaveQuestionnaireSuccess: questionDomainSelectors.selectIsSaveQuestionnaireSuccess(state),
            isSaveQuestionnaireFailed: questionDomainSelectors.selectIsSaveQuestionnaireFailed(state),
        }
    },
    mapDispatchToProps)(Questionnaire)

ConnectedQuestionnaire.propTypes = {
    id: PropTypes.string.isRequired,
    owner: PropTypes.string
}

ConnectedQuestionnaire.defaultProps = {
    id: uuidv4(),

}

export default ConnectedQuestionnaire;
