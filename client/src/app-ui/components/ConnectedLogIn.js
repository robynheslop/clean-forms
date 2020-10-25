import LogIn from "./LogIn";
import { connect } from "react-redux";
import { actions, selectors } from "../../app-domain";

const mapDispatchToProps = dispatch => {
    const handleLogIn = ({username, password}) => {
        dispatch(actions.logIn({username, password}))
    }
    return { handleLogIn }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: selectors.selectIsUserLoggedIn(state),
        isLogInPending: selectors.selectIsLogInPending(state),
        isLogInRejected: selectors.selectIsLogInRejected(state)
    }
}

export const ConnectedLogIn = connect(mapStateToProps, mapDispatchToProps)(LogIn);

export default ConnectedLogIn;