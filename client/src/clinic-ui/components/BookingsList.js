import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Table, TableCell, TableHead, TableContainer, TableRow, TableBody } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: "100%"
    },
    Failed: {
        backgroundColor: "#f07b7b"
    },
    Passed: {
        backgroundColor: "#7bf0b2"
    },
    Incomplete: {
        backgroundColor: "#d3d3d3"
    }
})


function BookingsList({ activeClinic }) {
    const classes = useStyles();
    const { bookings } = activeClinic;
    return (
        <div className={classes.root}>
            {bookings.length > 0 ?
                <div>
                    <h2>Your Bookings: </h2>
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
                                    <TableRow className={classes[status]}>
                                        <TableCell>{clientname}</TableCell>
                                        <TableCell>{status}</TableCell>
                                        <TableCell>{date}</TableCell>
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