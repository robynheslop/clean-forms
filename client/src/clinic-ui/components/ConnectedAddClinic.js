import AddClinics from "./AddClinic";
import { connect } from "react-redux";
import { actions, selectors } from "../../clinic-domain";
import { selectors as appSelectors } from "../../app-domain"

const mapDispatchToProps = dispatch => {
    const addClinic = ({owner, clinicname, email, phone }) => {
        dispatch(actions.addClinic({owner, clinicname, email, phone}))
    }
    return { addClinic }
}

export const ConnectedAddClinic = connect(
    state => ({
        isAddClinicPending: selectors.selectIsAddClinicPending(state),
        isAddClinicFulfilled: selectors.selectIsAddClinicFulfilled(state),
        isAddClinicRejected: selectors.selectIsAddClinicRejected(state),
        userId: appSelectors.selectUserId(state)
    }),
    mapDispatchToProps)(AddClinics)

export default ConnectedAddClinic;