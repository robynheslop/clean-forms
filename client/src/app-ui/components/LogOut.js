import React, { useEffect } from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from "prop-types";

export function LogOut({handleLogOut}) {
    useEffect(()=> {
        handleLogOut()
    }, []);

    return(
        <Redirect to="/login"/>
    )
}

LogOut.propTypes = {
    handleLogOut: PropTypes.func
}

LogOut.defaultProps = {
    handleLogOut: () => {}
}

export default LogOut;