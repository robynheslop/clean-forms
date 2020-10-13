import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Table, TableCell, TableHead, TableContainer, TableRow, TableBody } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: '83.333333%',
        margin: '0 auto',
    },
    failed: {
        backgroundColor: '#e58ca2'
    },
    passed: {
        backgroundColor: '#7bf0b2'
    },
    incomplete: {
        backgroundColor: '#e8e4e4'
    }
})


function BookingsList({ activeClinic }) {
    const classes = useStyles();
    const { bookings } = activeClinic;
    return (
        <div className={classes.root}>
            {bookings.length > 0 ?
                <div>
                    <h1>Your Bookings: </h1>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Client Name</TableCell>
                                    <TableCell>Screening Status</TableCell>
                                    <TableCell>Appointment Date</TableCell>
                                </TableRow>
                            </TableHead>
                            {bookings.map(({ id, clientname, status, date }) => {
                                return (
                                <TableBody key={id}>
                                    <TableRow className={classes[status.toLowerCase()]}>
                                        <TableCell>{clientname}</TableCell>
                                        <TableCell>{status === 'failed'? <b>{status.toUpperCase()}</b> : status.toUpperCase()}</TableCell>
                                        <TableCell>{date.toString().slice(0,10)}</TableCell>
                                    </TableRow>
                                </TableBody>)
                            })}
                        </Table>
                    </TableContainer>
                </div>
                :
                <div>
                    <h2>You have no bookings scheduled.</h2>
                </div>
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
    }))
}

BookingsList.defaultProps = {
    bookings: []
}

export default BookingsList;