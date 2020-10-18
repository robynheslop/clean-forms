import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#b1acae',
        border: 0,
        color: 'white',
        height: 48,
        position: 'sticky',
        top: 70,
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
            <AppBar className={classes.root}>
                <Link className={classes.link} to='/clinic'>View Clinics</Link>
                <Link className={classes.link} to='/clinic/add-clinic'>Add New Clinics</Link>
                <Link className={classes.link} to='/clinic/questionnaires'>Manage Questionnaires</Link>
                <Link className={classes.link} to='/clinic/questionnaires/add-questionnaire'>Create New Questionnaire</Link>
            </AppBar>

        </div>
    )
}

export default ClinicNavigation;