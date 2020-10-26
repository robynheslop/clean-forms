import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, CircularProgress, Table, TableCell, TableHead, TableContainer, TableRow, TableBody } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: '83.333333%',
        margin: '0 auto',
    },
    paper: {
        maxWidth: '83.333333%',
        margin: '0 auto',
        marginTop: '50px',
        padding: '3em 0em',
        height: '75%'
    },
    h1: {
        fontFamily: 'Poiret One',
        fontSize: '50px',
        padding: '30px'
    },
    failed: {
        backgroundColor: '#e58ca2'
    },
    passed: {
        backgroundColor: '#7bf0b2'
    },
    incomplete: {
        backgroundColor: '#e8e4e4'
    },
    progress: {
        display: 'block',
        margin: '100px auto'
    }
})


function BookingsList({ activeClinic}) {
    const classes = useStyles();
    const { bookings, isLoadBookingsPending } = activeClinic;
    return (
        <div className={classes.root}>
            {isLoadBookingsPending ?
            
                <div className={classes.progress} >
                    {console.log('true',isLoadBookingsPending)}
                    <CircularProgress color="secondary" />
                </div>

                :

                bookings.length > 0 ?
                    <div>
                        <h1 className={classes.h1}>BOOKINGS</h1>
                        {console.log('false',isLoadBookingsPending)}
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Client Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Contact Number</TableCell>
                                        <TableCell>Screening Status</TableCell>
                                        <TableCell>Appointment Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                {bookings.map(({ id, clientName, status, phone, date, email }) => {
                                    return (
                                        <TableBody key={id}>
                                            <TableRow className={classes[status.toLowerCase()]}>
                                                <TableCell>{status === 'failed' ? <b>{clientName}</b> : clientName}</TableCell>
                                                <TableCell>{status === 'failed' ? <b>{email}</b> : email}</TableCell>
                                                <TableCell>{status === 'failed' ? <b>{phone}</b> : phone}</TableCell>
                                                <TableCell>{status === 'failed' ? <b>{status.toUpperCase()}</b> : status.toUpperCase()}</TableCell>
                                                <TableCell>{status === 'failed' ? <b>{date.toString().slice(0, 10)}</b> : date.toString().slice(0, 10)}</TableCell>
                                            </TableRow>
                                        </TableBody>)
                                })}
                            </Table>
                        </TableContainer>
                    </div>
                    :
                    <Paper className={classes.paper}>
                        <h1 className={classes.h1}>YOU HAVE NO SCHEDULED BOOKINGS.</h1>
                    </Paper>
            }
        </div>
    )
}

BookingsList.propTypes = {
    bookings: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        clientname: PropTypes.string,
        status: PropTypes.string,
        date: PropTypes.string,
    })),
    isLoadBookingsPending: PropTypes.bool
}

BookingsList.defaultProps = {
    bookings: [],
    isLoadBookingsPending: false
}

export default BookingsList;