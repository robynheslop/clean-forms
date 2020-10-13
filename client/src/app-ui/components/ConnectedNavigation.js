import Navigation from "./Navigation";
import { connect } from "react-redux";
import { selectors } from "../../app-domain";

export const ConnectedNavigation = connect(state => ({isLoggedIn: selectors.selectIsUserLoggedIn(state)}))(Navigation)

export default ConnectedNavigation;