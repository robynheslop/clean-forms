import Screening from './Screening';
import { connect } from 'react-redux';
import { actions, selectors } from "../../questionnaire-domain";

const mapDispatchToProps = dispatch => {
    const submitScreening = (formData) => {
        dispatch(actions.submitScreening(formData))
    }
    return { submitScreening }
}
export const ConnectedScreening = connect(
    state => ({
        id, 
        screeningQuestionnaire,
        isSumbitScreeningSuccess
    }),
    mapDispatchToProps)(Screening)

export default ConnectedScreening;
