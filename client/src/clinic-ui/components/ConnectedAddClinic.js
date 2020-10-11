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
        isAddingClinicPending: selectors.selectIsAddingClinicPending(state),
        userId: appSelectors.selectUserId(state)
    }),
    mapDispatchToProps)(AddClinics)

export default ConnectedAddClinic;