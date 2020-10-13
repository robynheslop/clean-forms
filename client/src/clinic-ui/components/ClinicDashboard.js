import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { ConnectedViewClinics as ViewClinics } from "./ConnectedViewClinics";
import { ConnectedAddBooking as AddBooking } from "./ConnectedAddBooking";
import { ConnectedBookingsList as BookingsList } from "./ConnectedBookingsList";
import { ConnectedAddClinic as AddClinic } from "./ConnectedAddClinic";


export function ClinicDashboard() {
    let { path } = useRouteMatch();
    return (
        < Switch >
            <Route exact path={`${path}/new-booking`} component={AddBooking} />
            <Route exact path={`${path}/view-bookings`} component={BookingsList} />
            <Route exact path={`${path}/add-clinic`} component={AddClinic} />
            <Route path={path} component={ViewClinics} />
        </ Switch >
    )
}

export default ClinicDashboard;