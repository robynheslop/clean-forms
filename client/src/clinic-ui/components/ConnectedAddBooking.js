import AddBooking from "./AddBooking";
import { connect } from "react-redux";
import { actions, selectors } from "../../clinic-domain";
import { selectors as questionnaireSelectors } from "../../questionnaire-domain";

const mapDispatchToProps = dispatch => {
    const addBooking = ({ clinic, clinicName, clinicPhone, clientName, email, phone, date, questionnaireId }) => {
        dispatch(actions.addBooking({ clinic, clinicName, clinicPhone, clientName, email, phone, date, questionnaireId }))
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