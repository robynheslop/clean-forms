import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Table, TableCell, TableHead, TableContainer, TableRow, TableBody } from '@material-ui/core';

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
                                    <TableCell>Email</TableCell>
                                    <TableCell>Screening Status</TableCell>
                                    <TableCell>Appointment Date</TableCell>
                                </TableRow>
                            </TableHead>
                            {bookings.map(({ id, clientname, status, date, email }) => {
                                return (
                                <TableBody key={id}>
                                    <TableRow className={classes[status.toLowerCase()]}>
                                        <TableCell>{status === 'failed'? <b>{clientname}</b> : clientname}</TableCell>
                                        <TableCell>{status === 'failed'? <b>{email}</b> : email}</TableCell>
                                        <TableCell>{status === 'failed'? <b>{status.toUpperCase()}</b> : status.toUpperCase()}</TableCell>
                                        <TableCell>{status === 'failed'? <b>{date.toString().slice(0,10)}</b> : date.toString().slice(0,10)}</TableCell>
                                    </TableRow>
                                </TableBody>)
                            })}
                        </Table>
                    </TableContainer>
                </div>
                :
                <Paper className={classes.paper}>
                    <h1>You have no bookings scheduled.</h1>
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
    }))
}

BookingsList.defaultProps = {
    bookings: []
}

export default BookingsList;