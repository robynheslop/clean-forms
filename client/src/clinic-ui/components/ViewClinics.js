import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Paper, Card, CardActions, CardContent, Typography, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: '83.333333%',
        margin: '0 auto',
        marginTop: '50px',
        padding: '3em 0em',
        height: '75%'
    },
    card: {
        textAlign: 'left',
        display: 'flex',
    },
    cardContent: {
        padding: '0px 1em'
    },
    cardActions: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 'auto',
    },
    link: {
        color: '#be294f',
        textDecoration: 'none',
        margin: '10px'
    }
});


function ViewClinics({ handleViewBookings, handleMakeBooking, clinics }) {
    const classes = useStyles();
    const history = useHistory();
    console.log(clinics.length)
    return (
        <Paper className={classes.root}>
            {!(clinics.length === 0) ?
                <div>
                    <h1>Your Clinics: </h1>
                    {clinics.map(({ id, clinicname, email, phone }) =>
                        <Card key={id} className={classes.card}>

                            <Grid item xs={9}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant='h5' component='h2'>
                                        Clinic Name: {clinicname}
                                    </Typography>
                                    <Typography color='textSecondary'>
                                        Clinic Email: {email}
                                    </Typography>
                                    <Typography color='textSecondary'>
                                        Clinic Phone: {phone}
                                    </Typography>
                                </CardContent>
                            </Grid>

                            <Grid item xs={3}>
                                <CardActions className={classes.cardActions}>
                                    <Button
                                        onClick={() => {
                                            history.push(`/clinic/new-booking`)
                                            handleMakeBooking(id)
                                        }}>
                                        Add New Booking
                                </Button>
                                    <Button
                                        onClick={() => {
                                            history.push(`/clinic/view-bookings`)
                                            handleViewBookings(id)
                                        }}>
                                        View Bookings
                                </Button>
                                </CardActions>
                            </Grid>
                        </Card>
                    )}
                </div>
                :
                <div>
                    <h1>You Have No Listed Clinics: </h1>
                    <h3><Link className={classes.link} to={`/clinic/add-clinic`}>Add some today</Link></h3>
                </div>
            }
        </Paper >
    )
}

ViewClinics.propTypes = {
    handleMakeBooking: PropTypes.func,
    handleViewBookings: PropTypes.func,
    clinics: PropTypes.array,
    userId: PropTypes.string
}

ViewClinics.defaultProps = {
    handleMakeBooking: () => { },
    handleViewBookings: () => { },
    clinics: [],
    userId: undefined
}

export default ViewClinics;