import AddBooking from "./AddBooking";
import { connect } from "react-redux";
import { actions, selectors } from "../../clinic-domain";

const mapDispatchToProps = dispatch => {
    const addBooking = (formData) => {
        dispatch(actions.addBooking(formData))
    }
    return { addBooking }
}

export const ConnectedAddBooking = connect(
    state => ({
        activeClinic: selectors.selectActiveClinic(state),
        isAddBookingPending: selectors.selectIsAddBookingPending(state)
    }),
    mapDispatchToProps)(AddBooking)

export default ConnectedAddBooking;