import ViewClinics from "./ViewClinics";
import { connect } from "react-redux";
import { actions, selectors } from "../../clinic-domain";

const mapDispatchToProps = dispatch => {
    const handleViewBookings = (id) => {
        dispatch(actions.selectActiveClinic(id))
        dispatch(actions.loadBookings(id))
    }
    const handleMakeBooking = (id, clinicName, phone) => {
        dispatch(actions.selectActiveClinic(id, clinicName, phone))
    }
    return { handleMakeBooking, handleViewBookings }
}
export const ConnectedViewClinics = connect(
    state => ({
        clinics: selectors.selectClinics(state),
        isLoadClinicsPending: selectors.selectIsLoadClinicsPending(state),
    }),
    mapDispatchToProps)(ViewClinics)

export default ConnectedViewClinics;
