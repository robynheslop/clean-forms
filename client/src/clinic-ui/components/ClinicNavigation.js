import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#b1acae',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(120, 102, 105, .3)',
        color: 'white',
        height: 48,
        padding: '70px 30px',
        minHeight: 'calc(100vh - 70px)'
    },
    link: {
        fontSize: '1.2em',
        color: 'white',
        padding: '2em 0px',
        textDecoration: 'none',
        float: 'right'
    }
})


export function ClinicNavigation() {
    const classes = useStyles();
    return (
        <div>
            <AppBar position='static' className={classes.root}>
                <Link className={classes.link} to='/clinic'>View Clinics</Link>
                <Link className={classes.link} to='/clinic/add-clinic'>Add New Clinics</Link>
            </AppBar>

        </div>
    )
}

export default ClinicNavigation;