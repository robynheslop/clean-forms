import Screening from "./Screening";
import { connect } from "react-redux";
import { actions, selectors } from "../../booking-domain";

const mapDispatchToProps = dispatch => {
    const onLoad = (id) => {
        dispatch(actions.getScreening(id))
    }
    return { onLoad }
}

export const ConnectedScreening = connect(
    state => ({
        
    }),
    mapDispatchToProps)(Screening)

export default ConnectedScreening;