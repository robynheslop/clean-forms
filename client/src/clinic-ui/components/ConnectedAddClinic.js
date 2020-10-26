import AddClinics from "./AddClinic";
import { connect } from "react-redux";
import { actions, selectors } from "../../clinic-domain";
import { selectors as appSelectors } from "../../app-domain"

const mapDispatchToProps = dispatch => {
    const addClinic = ({owner, clinicName, email, phone }) => {
        dispatch(actions.addClinic({owner, clinicName, email, phone}))
    }
    return { addClinic }
}

export const ConnectedAddClinic = connect(
    state => ({
        isAddClinicPending: selectors.selectIsAddClinicPending(state),
        isAddClinicFailed: selectors.selectIsAddClinicFailed(state),
        isAddClinicSuccess: selectors.selectIsAddClinicSuccess(state),
        userId: appSelectors.selectUserId(state)
    }),
    mapDispatchToProps)(AddClinics)

export default ConnectedAddClinic;