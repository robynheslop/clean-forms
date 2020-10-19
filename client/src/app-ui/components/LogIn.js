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
    }
})

export function LogIn({ handleLogIn, location, isLoggedIn }) {
    const classes = useStyles();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const handleFormSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        handleLogIn({
            username: usernameRef.current.value,
            password: passwordRef.current.value
        })
    }
    return (
        isLoggedIn ? <Redirect to={{ pathname: "/", state: { from: location } }} /> :
            <Paper className={classes.root}>
                <h1 className={classes.h1}>CLEAN FORMS</h1>
                <h2>Log In</h2>
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
                        >Log In</Button>
                    </div>
                </form>
            </Paper >
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
    handleLogIn: () => { },
    isLoggedIn: false,
    isLogInPending: false
}

export default LogIn;