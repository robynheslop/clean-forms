import React, { useRef } from 'react';
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from '@material-ui/core';

export function SignUp({isLoggedIn, location, handleSignUp, isSignUpPending}) {
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleFormSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        console.log({
            username: usernameRef.current.value, 
            password: passwordRef.current.value
        })
        handleSignUp({
            username: usernameRef.current.value, 
            password: passwordRef.current.value
        })
    }

    return (
        isLoggedIn ? <Redirect to={{ pathname: "/", state: { from: location } }} /> :
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <input
                            label="Username"
                            type="text"
                            name="password"
                            pattern=".{2,20}"
                            ref={ usernameRef }
                            required />
                    </div>
                    <div>
                        <input
                            label="Password"
                            type="password"
                            name="password"
                            ref={ passwordRef }
                            required />
                    </div>
                    <div>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{ margin: 8 }}
                            color="secondary"
                        >Log In</Button>
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
