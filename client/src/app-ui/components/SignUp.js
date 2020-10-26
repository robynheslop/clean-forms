import React, { useRef } from 'react';
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, TextField, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '80%',
        maxWidth: "700px",
        margin: "0 auto",
        marginTop: '50px',
        padding: "2em 0em",
        justifyContent: "center"
    },
    h1: {
        fontFamily: 'Poiret One',
        fontSize: '75px',
        padding: '30px'
    },
    textField: {
        lineHeight: "1.2em",
        padding: '10px',
        margin: '10px',
        backgroundColor: '#edeaea',
        fontSize: "1.1em",
        width: '50%',
        border: "none"
    },
    button: {
        backgroundColor: '#be294f',
        padding: "15px 25px",
        boxShadow: 'none',
        color: 'white',
        margin: '15px',
    },
    error: {
        color: '#be294f',
    }
})

export function SignUp({ isLoggedIn, location, handleSignUp, isSignUpRejected, isSignUpPending }) {
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
                <h1 className={classes.h1}>CLEAN FORMS</h1>
                <h2>Sign Up</h2>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <TextField
                            className={classes.textField}
                            color="secondary"
                            label="Choose a username - no more than 20 characters"
                            type="text"
                            name="password"
                            pattern=".{2,20}"
                            inputRef={usernameRef}
                            required />
                    </div>
                    <div>
                        <TextField
                            className={classes.textField}
                            color="secondary"
                            label="Password"
                            type="password"
                            name="password"
                            inputRef={passwordRef}
                            required />
                    </div>
                    {
                        isSignUpRejected ? 
                        <p className={classes.error}>Sorry, there is an error with your sign up. Please try again with different details.</p> :
                        undefined
                    }
                    <div>
                        <Button
                            className={classes.button}
                            type="submit"
                            variant="contained"
                        >Sign Up</Button>
                    </div>
                    {isSignUpPending ?
                        <div className={classes.progress}>
                            <CircularProgress color="secondary" />
                        </div> :
                        undefined
                    }
                </form>
            </Paper >
    )
}

SignUp.propTypes = {
    isLoggedIn: PropTypes.bool,
    location: PropTypes.object,
    handleSignUp: PropTypes.func,
    isSignUpPending: PropTypes.bool,
    isSignUpRejected: PropTypes.bool
}

SignUp.defaultProps = {
    isLoggedIn: false,
    location: undefined,
    handleSignUp: () => { },
    isSignUpPending: false,
    isSignUpRejected: false
}

export default SignUp;
