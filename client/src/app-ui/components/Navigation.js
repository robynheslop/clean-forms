import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ConnectedLogOut as LogOut } from './ConnectedLogOut'
import { ConnectedSignUp as SignUp } from './ConnectedSignUp';
import { ConnectedLogIn as LogIn } from './ConnectedLogIn';
import { Body } from './Body';
import { ConnectedPrivateRoute as PrivateRoute } from './ConnectedPrivateRoute'

const useStyles = makeStyles({
    root: {
        backgroundColor: '#be294f',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0px',
        margin: '0px',
        height: '70px'
    },
    tabs: {
        width: 'fit-content',
        display: 'flex',
        
    },
    link: {
        justifyContent: 'space-between',
        alignSelf: 'flex-end',
        fontSize: '1.2em',
        color: 'white',
        padding: '20px 2em',
        textDecoration: 'none',
    }

})

export function Navigation({ isLoggedIn }) {
    const classes = useStyles()
    return (
        <div >
            <AppBar className={classes.root} position='static'>
                <div className={classes.tabs}>
                    {!isLoggedIn ?
                        <Link className={classes.link} to='/signup'>Sign Up</Link> :
                        undefined}
                    {!isLoggedIn ?
                        <Link className={classes.link} to='/login'>Log In</Link> :
                        undefined}
                    {isLoggedIn ?
                        <Link className={classes.link} to='/'>Home</Link> :
                        undefined}
                    {isLoggedIn ?
                        <Link className={classes.link} to='/logout'>Log Out</Link> :
                        undefined}

                </div>
            </AppBar>
            <Switch>
                <Route path='/signup' component={SignUp} />
                <Route path='/logout' component={LogOut} />
                <Route path='/login' component={LogIn} />
                {/* <Route path='/screening/:id' component={Screening} /> */}
                <PrivateRoute path='/' component={Body} />
            </Switch>
        </div>
    )
}

Navigation.propTypes = {
    isLoggedIn: PropTypes.bool
}

Navigation.defaultProps = {
    isLoggedIn: false
}

export default Navigation;