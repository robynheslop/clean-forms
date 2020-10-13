import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

export function Navigation({isLoggedIn}) {
    return (
        <nav>
            <ul style={{ display: "flex", listStyle: "none" }}>
                {!isLoggedIn ? <li style={{ margin: "0 1em" }}><Link to="/signup">Sign Up</Link></li> : undefined}
                {!isLoggedIn ? <li style={{ margin: "0 1em" }}><Link to="/login">Log In</Link></li> : undefined}
                {isLoggedIn ? <li style={{ margin: "0 1em" }}><Link to="/">Home</Link></li> : undefined}
                {isLoggedIn ? <li style={{ margin: "0 1em" }}><Link to="/clinic/add-clinic">Add New Clinic</Link></li> : undefined}
                {isLoggedIn ? <li style={{ margin: "0 1em" }}><Link to="/logout">Log Out</Link></li> : undefined}
            </ul>
        </nav >
    )
}

Navigation.propTypes = {
    isLoggedIn: PropTypes.bool
}

Navigation.defaultProps = {
    isLoggedIn: false
}

export default Navigation;