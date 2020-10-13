import React from "react";
import { Grid } from "@material-ui/core";
import ClinicNavigation from "./ClinicNavigation";

export function ClinicDashboard() {
    return (
        <div>
            <Grid>
                <ClinicNavigation />
            </Grid>
        </div>
    )
}

export default ClinicDashboard;

{/* < Switch >
    <Route exact path={`${path}/new-booking`} component={AddBooking} />
    <Route exact path={`${path}/view-bookings`} component={BookingsList} />
    <Route exact path={`${path}/add-clinic`} component={AddClinic} />
    <Route path={path} component={ViewClinics} />
</ Switch > */}