import React, { useRef } from 'react';
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";


export function LogIn(props){
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleFormSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        props.handleLogIn({
            username: usernameRef.current.value, 
            password: passwordRef.current.value
        });
    }

    return (
        props.isLoggedIn ? <Redirect to={{ pathname: "/", state: { from: props.location } }} /> : 
            <div>
                <h2>Log In</h2>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Username: </label>
                        <input type="text" name="username" pattern=".{2,20}" ref={usernameRef} required />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" name="password" ref={passwordRef} required />
                    </div>
                    <div>
                        <input type="submit" value="Log In" />
                    </div>
                </form>
            </div>
    )
}

LogIn.propTypes = {
    location: PropTypes.object,
    handleLogIn: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    isLogInPending: PropTypes.bool
}

LogIn.defaultProps = {
    location: undefined,
    handleLogIn: () => {},
    isLoggedIn: false,
    isLogInPending: false
}

export default LogIn;