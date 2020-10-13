import BookingsList from "./BookingsList";
import { connect } from "react-redux";
import { selectors } from "../../clinic-domain";

export const ConnectedBookingsList = connect(
    state => ({
        isLoadBookingsPending: selectors.selectIsLoadBookingsPending(state),
        activeClinic: selectors.selectActiveClinic(state)
    }))(BookingsList)

export default ConnectedBookingsList;