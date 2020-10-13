import BookingsList from "./BookingsList";
import { connect } from "react-redux";
import { selectors } from "../../clinic-domain";

export const ConnectedBookingsList = connect(
    state => ({
        isLoadBookingsPending: selectors.selectIsLoadBookingsPending(state),
        bookings: selectors.selectBookings(state)
    }))(BookingsList)

export default ConnectedBookingsList;