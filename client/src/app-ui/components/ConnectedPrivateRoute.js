import PrivateRoute from "./PrivateRoute";
import { connect } from "react-redux";
import { selectors } from "../../app-domain";

export const ConnectedPrivateRoute = connect(state =>({isLoggedIn: selectors.selectIsUserLoggedIn(state)}))(PrivateRoute);

export default ConnectedPrivateRoute;