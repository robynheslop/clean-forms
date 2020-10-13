import React, { useRef } from 'react';
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '80%',
        maxWidth: "700px",
        margin: "0 auto",
        padding: "2em 0em",
        justifyContent: "center"
    },
    textField: {
        lineHeight: "1.2em",
        padding: '10px',
        margin: '10px',
        fontSize: "1.1em",
        width: '50%',
        border: "none",
        backgroundColor: "none!important"
    },
    button: {
        backgroundColor: '#be294f',
        padding: "15px 25px",
        boxShadow: 'none',
        color: 'white'
    }
})

export function SignUp({ isLoggedIn, location, handleSignUp, isSignUpPending }) {
    const classes = useStyles();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const handleFormSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        handleSignUp({
            username: usernameRef.current.value,
            password: passwordRef.current.value
        })
    }

    return (
        isLoggedIn ? <Redirect to={{ pathname: "/", state: { from: location } }} /> :
            <Paper className={classes.root}>
                <h1>Sign Up</h1>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <input
                            className={classes.textField}
                            label="Username"
                            type="text"
                            name="password"
                            pattern=".{2,20}"
                            ref={usernameRef}
                            required />
                    </div>
                    <div>
                        <input
                            className={classes.textField}
                            label="Password"
                            type="password"
                            name="password"
                            ref={passwordRef}
                            required />
                    </div>
                    <div>
                        <Button
                            className={classes.button}
                            type="submit"
                            variant="contained"
                            style={{ margin: 8 }}
                        >Log In</Button>
                    </div>
                </form>
            </Paper >
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
    handleSignUp: () => { },
    isSignUpPending: false
}

export default SignUp;
