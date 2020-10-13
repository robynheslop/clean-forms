import AddBooking from "./AddBooking";
import { connect } from "react-redux";
import { actions, selectors } from "../../clinic-domain";

const mapDispatchToProps = dispatch => {
    const addBooking = (props) => {
        dispatch(actions.addBooking(props))
    }
    return { addBooking }
}

export const ConnectedAddBooking = connect(
    state => ({
        clinicId: selectors.selectActiveClinic(state),
        isAddBookingPending: selectors.selectIsAddBookingPending(state)
    }),
    mapDispatchToProps)(AddBooking)

export default ConnectedAddBooking;