import React, { useRef } from 'react';
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        color: "purple",
        
    },
    form: {
            
    }
})

export function LogIn(props) {

    const classes = useStyles();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleFormSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        props.handleLogIn({
            username: usernameRef.current.value,
            password: passwordRef.current.value
        })
    }

    return (
        props.isLoggedIn ? <Redirect to={{ pathname: "/", state: { from: props.location } }} /> :
            <div>
                <h2>Log In</h2>
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <input
                            label="Username"
                            type="text"
                            name="password"
                            pattern=".{2,20}"
                            ref={usernameRef}
                            required />
                    </div>
                    <div>
                        <input
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
            </div >
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