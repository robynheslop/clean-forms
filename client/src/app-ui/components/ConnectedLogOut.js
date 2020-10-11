import LogOut from "./LogOut";
import { connect } from "react-redux";
import { actions } from "../../app-domain";

export const ConnectedLogOut = connect(undefined, {handleLogOut: actions.logOut})(LogOut);

export default ConnectedLogOut;