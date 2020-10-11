import React, { useRef } from 'react';
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export function SignUp({isLoggedIn, location, handleSignUp, isSignUpPending}) {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleFormSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        handleSignUp({username: usernameRef.current.value, password:passwordRef.current.value})
    }

    return (
        isLoggedIn ? <Redirect to={{ pathname: "/", state: { from: location } }} /> :
            <div>
                <h2>Sign Up</h2>
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
                        <input type="submit" value="Sign Up" />
                    </div>
                </form>
            </div>
    )
}

SignUp.propTypes = {
    isLoggedIn: PropTypes.bool,
    location: PropTypes.object,
    handleSignUp: PropTypes.func,
    isSignUpPending: PropTypes.bool
}

SignUp.defaultProps = {
    isLoggedIn: false,
    location: undefined,
    handleSignUp: () => {},
    isSignUpPending: false
}

export default SignUp;
