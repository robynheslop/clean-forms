import SignUp from "./SignUp";
import { connect } from "react-redux";
import { actions, selectors } from "../../app-domain";

export const ConnectedSignUp = connect(
    state => ({
        isLoggedIn: selectors.selectIsUserLoggedIn(state),
        isSignUpPending: selectors.selectIsSignUpPending(state),
    }),
    { handleSignUp: actions.signUp })(SignUp)

export default ConnectedSignUp;