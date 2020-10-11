import ListClinics from "./ListClinics";
import { connect } from "react-redux";
import { actions, selectors } from "../../clinic-domain";
import { selectors as appSelectors } from "../../app-domain";

const mapDispatchToProps = dispatch => {
    const getAllClinics = ({owner}) => {
        dispatch(actions.getClinics({owner}))
    }
    return { getAllClinics }
}

export const ConnectedListClinics = connect(
    state => ({
        clinics: selectors.selectClinics(state),
        isGettingClinicsPending: selectors.selectIsGettingClinicsPending(state),
        userId: appSelectors.selectUserId(state)
    }),
    mapDispatchToProps)(ListClinics)

export default ConnectedListClinics;