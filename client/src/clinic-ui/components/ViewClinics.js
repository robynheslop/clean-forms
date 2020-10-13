import React from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { Card, CardActions, CardContent, Typography, Button } from '@material-ui/core';

function ViewClinics({ handleViewBookings, handleMakeBooking, clinics }) {
    const history = useHistory();
    return (
        <div>
            {clinics ?
                <div>
                    <h2>Your Clinics: </h2>
                    {clinics.map(({ id, clinicname, email, phone }) =>
                        <Card key={id}>
                            <CardContent>
                                <Typography color="textSecondary">
                                    Clinic Name: {clinicname}
                                </Typography>
                                <Typography color="textSecondary">
                                    Clinic Email: {email}
                                </Typography>
                                <Typography color="textSecondary">
                                    Clinic Phone: {phone}
                                </Typography>
                            </CardContent>

                            <CardActions>
                                <Button onClick={() => {
                                    history.push(`/clinic/new-booking`)
                                    handleMakeBooking(id)
                                }}>
                                    Add New Booking
                                </Button>
                                <Button onClick={() => {
                                    history.push(`/clinic/view-bookings`)
                                    handleViewBookings(id)
                                }}>
                                    View Bookings
                                </Button>
                            </CardActions>
                        </Card>
                    )}
                </div>
                :
                <div>
                    <p>You have no clinics, add some today.</p>

                    <Link to={`/clinic/add-clinic`}>Add A New Clinic</Link>

                </div>
            }
        </div >
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