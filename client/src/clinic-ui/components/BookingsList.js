import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import { makeStyles, FormControlLabel, Checkbox, Button, Paper, CircularProgress, Table, TableCell, TableHead, TableContainer, TableRow, TableBody } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: '83.333333%',
        margin: '0 auto',
    },
    paper: {
        maxWidth: '83.333333%',
        margin: '50px auto',
        marginTop: '50px',
        padding: '3em 0em',
        height: 'fit-content'
    },
    h1: {
        fontFamily: 'Poiret One',
        fontSize: '50px',
        padding: '30px 30px 0px 30px'
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
    },
    checkbox: {
        display: 'block',
        float: 'right',
        padding: '20px 0'
    }
})


function BookingsList({ activeClinic: { bookings, isLoadBookingsPending } }) {
    const classes = useStyles();
    const [bookingState, setBookingState] = useState();
    const [futureBookingsState, setFutureBookingState] = useState(false);

    useEffect(() => {
        if (futureBookingsState) return setBookingState(bookings);
        const today = moment().format("YYYY-MM-DD")
        const futureBookings = bookings.slice().filter(booking => booking.date >= today);
        setBookingState(futureBookings);
    }, [bookings, futureBookingsState]);

    const sortingBookings = (sortingTerm) => {
        const sortedBookings = bookingState.slice().sort(function (a, b) {
            if (a[sortingTerm] < b[sortingTerm]) {
                return -1;
            }
            if (a[sortingTerm] > b[sortingTerm]) {
                return 1;
            }
            return 0;
        });
        setBookingState(sortedBookings);
    }

    return (
        <div className={classes.root}>
            {isLoadBookingsPending ?

                <div className={classes.progress} >
                    <CircularProgress color="secondary" />
                </div>

                :

                bookingState.length > 0 ?
                    <div>
                        <h1 className={classes.h1}>BOOKINGS</h1>

                        <FormControlLabel
                            className={classes.checkbox}
                            control={
                                <Checkbox
                                    checked={futureBookingsState}
                                    onChange={(event) => {
                                        setFutureBookingState(event.target.checked)
                                    }}
                                />
                            }
                            label="Include Past Bookings"
                        />

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Client Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Contact Number</TableCell>
                                        <TableCell><Button
                                            type="button"
                                            onClick={() => sortingBookings('status')}>
                                            Screening Status</Button></TableCell>
                                        <TableCell><Button
                                            type="button"
                                            onClick={() => sortingBookings('date')}>
                                            Appointment Date</Button></TableCell>
                                    </TableRow>
                                </TableHead>
                                {bookingState.map(({ id, clientName, status, phone, date, email }) => {
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