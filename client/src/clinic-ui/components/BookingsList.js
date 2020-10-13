import React from "react";
import PropTypes from "prop-types";
import { Card, Typography } from '@material-ui/core';

function BookingsList({ activeClinic }) {
    const { bookings } = activeClinic;
    return (
        <div>
            {bookings.length > 0 ?
                <div>
                    <h2>Your Bookings: </h2>
                    {bookings.map(({ id, clientname, status, date }) =>
                        <Card key={id}>
                            <Typography color="textSecondary">
                                Client Name: {clientname}
                            </Typography>
                            <Typography color="textSecondary">
                                COVID Booking Status: {status}
                            </Typography>
                            <Typography color="textSecondary">
                                Booking Date: {date}
                            </Typography>
                        </Card>
                    )}
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