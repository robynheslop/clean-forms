import AddBooking from "./AddBooking";
import { connect } from "react-redux";
import { actions, selectors } from "../../clinic-domain";
import { selectors as questionnaireSelectors } from "../../questionnaire-domain";

const mapDispatchToProps = dispatch => {
    const addBooking = (formData) => {
        dispatch(actions.addBooking(formData))
    }
    return { addBooking }
}

export const ConnectedAddBooking = connect(
    state => ({
        activeClinic: selectors.selectActiveClinic(state),
        questionnaires: questionnaireSelectors.selectQuestionnaires(state),
        isAddBookingPending: selectors.selectIsAddBookingPending(state)
    }),
    mapDispatchToProps)(AddBooking)

export default ConnectedAddBooking;