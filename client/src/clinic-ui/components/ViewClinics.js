import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Paper, Card, CircularProgress, CardActions, CardContent, Typography, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: '83.333333%',
        margin: '50px auto',
        marginTop: '50px',
        padding: '3em 0em',
        height: 'fit-content'
    },
    h1: {
        fontFamily: 'Poiret One',
        fontSize: '50px',
        padding: '30px'
    },
    card: {
        textAlign: 'left',
        display: 'flex',
        width: '80%',
        margin: '0 auto',
        marginBottom: '15px'
    },
    cardContent: {
        padding: '1em'
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
    },
    progress: {
        display: 'block',
        margin: '20px auto'
    }
});


function ViewClinics({ isLoadClinicsPending, handleViewBookings, handleMakeBooking, clinics }) {
    const classes = useStyles();
    const history = useHistory();
    console.log(clinics.length)
    return (
        <Paper className={classes.root}>
            { isLoadClinicsPending ?

                <div className={classes.progress} >
                    <CircularProgress color="secondary" />
                </div>

                :

                !(clinics.length === 0) ?
                    <div>
                        <h1 className={classes.h1}>CLINICS</h1>
                        {clinics.map(({ id, clinicName, email, phone }) =>
                            <Card key={id} className={classes.card}>

                                <Grid item xs={9}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant='h5' component='h2'>
                                            {clinicName}
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
                                                handleMakeBooking(id, clinicName, phone)
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
                        <h1 className={classes.h1}>YOU HAVE NO LISTED CLINICS</h1>
                        <h3><Link className={classes.link} to={`/clinic/add-clinic`}>Add some today</Link></h3>
                    </div>

            }
        </Paper >
    )
}

ViewClinics.propTypes = {
    handleMakeBooking: PropTypes.func,
    handleViewBookings: PropTypes.func,
    isLoadClinicsPending: PropTypes.bool,
    clinics: PropTypes.array,
    userId: PropTypes.string
}

ViewClinics.defaultProps = {
    handleMakeBooking: () => { },
    handleViewBookings: () => { },
    isLoadClinicsPending: false,
    clinics: [],
    userId: undefined
}

export default ViewClinics;