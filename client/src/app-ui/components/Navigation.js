import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Tab, Tabs } from '@material-ui/core';
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
        height: 48,
        padding: '0px',
        margin: '0px',
        height: '70px'
    },
    tabs: {
        width: 'fit-content',
    },
    link: {
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
                <Tabs className={classes.tabs}>
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

                </Tabs>
            </AppBar>
            <Switch>
                <Route path='/signup' component={SignUp} />
                <Route path='/logout' component={LogOut} />
                <Route path='/login' component={LogIn} />
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



// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { AppBar, Box, Tab, Tabs } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import { ConnectedLogOut as LogOut } from './ConnectedLogOut'
// import { ConnectedSignUp as SignUp } from './ConnectedSignUp';
// import { ConnectedLogIn as LogIn } from './ConnectedLogIn';
// import { Body } from './Body';

// function TabPanel({ children: Component, value, index, ...other }) {
//     return (
//         <div
//             role='tabpanel'
//             hidden={value !== index}
//             id={`wrapped-tabpanel-${index}`}
//             aria-labelledby={`wrapped-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box p={3}>
//                     <Component></Component>
//                 </Box>
//             )}
//         </div>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.any,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//     return {
//         id: `main-tabpanel-${index}`,
//         'aria-controls': `wrapped-tabpanel-${index}`,
//     };
// }

// export function Navigation({ isLoggedIn }) {
//     const [value, setValue] = useState('Log In');

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };
//     return (
//         <div>
//             <AppBar position='static'>
//                 <Tabs
//                     value={value}
//                     onChange={handleChange}
//                     aria-label='main tabs'>
//                     {isLoggedIn ?
//                         <Tab
//                             value='Home'
//                             label='Home'
//                             {...a11yProps('Home')} /> :
//                         undefined}
//                     {isLoggedIn ?
//                         <Tab
//                             value='Log Out'
//                             label='Log Out'
//                             {...a11yProps('Log Out')} /> :
//                         undefined}
//                     {!isLoggedIn ?
//                         <Tab
//                             value='Log In'
//                             label='Log In'
//                             {...a11yProps('Log In')} /> :
//                         undefined}
//                     {!isLoggedIn ?
//                         <Tab
//                             value='Sign Up'
//                             label='Sign Up'
//                             {...a11yProps('Sign Up')} /> :
//                         undefined}
//                 </Tabs>
//             </AppBar>
//             <TabPanel value={value} index={'Home'}>
//                 {Body}
//             </TabPanel>
//             <TabPanel value={value} index={'Log Out'}>
//                 {LogOut}
//             </TabPanel>
//             <TabPanel value={value} index={'Log In'}>
//                 {LogIn}
//             </TabPanel>
//             <TabPanel value={value} index={'Sign Up'}>
//                 {SignUp}
//             </TabPanel>
//         </div>
//     )
// }

// Navigation.propTypes = {
//     isLoggedIn: PropTypes.bool
// }

// Navigation.defaultProps = {
//     isLoggedIn: false
// }

// export default Navigation;