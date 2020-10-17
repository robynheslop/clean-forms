import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { ConnectedViewClinics as ViewClinics } from './ConnectedViewClinics';
import { ConnectedAddBooking as AddBooking } from './ConnectedAddBooking';
import { ConnectedBookingsList as BookingsList } from './ConnectedBookingsList';
import { ConnectedAddClinic as AddClinic } from './ConnectedAddClinic';
import { Grid } from '@material-ui/core';
import ClinicNavigation from './ClinicNavigation';
import AddQuestionnaire from "../../questionnaire-ui/components/AddQuestionnaire"

const useStyles = makeStyles({
    root: {
        backgroundColor: '#ffffff',
        border: 0,   
        display: 'flex',
        width: '100%'
    },
})


export function ClinicDashboard() {
    const classes = useStyles();
    let { path } = useRouteMatch();
    return (
        <div className={classes.root}>
            <Grid item sm={3} md={2}>
                <ClinicNavigation />
            </Grid>
            <Grid item sm={9} md={10}>
            < Switch >
                <Route exact path={`${path}/new-booking`} component={AddBooking} />
                <Route exact path={`${path}/view-bookings`} component={BookingsList} />
                <Route exact path={`${path}/add-clinic`} component={AddClinic} />
                <Route exact path={`${path}/questionnaires/add-questionnaire`} component={AddQuestionnaire} />
                <Route path={path} component={ViewClinics} />
            </ Switch >
            </Grid>
            
        </div>
    )
}

export default ClinicDashboard;

