import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component : Component, isLoggedIn, ...rest}) => {

    return(
        <Route {...rest} render={props => 
            isLoggedIn ?
            (<Component {...props}/> ) :
            (<Redirect to={{pathname: "/login", state: {from: props.location}}}/>)
            }>
        </Route>
    )
}

PrivateRoute.propTypes = {
    component: PropTypes.func,
    isLoggedIn: PropTypes.bool
}

PrivateRoute.defaultProps = {
    component: undefined,
    isLoggedIn: false
}

export default PrivateRoute;