import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, AppBar, Box, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { ConnectedViewClinics as ViewClinics } from "./ConnectedViewClinics";
import { ConnectedAddClinic as AddClinic } from "./ConnectedAddClinic";

function TabPanel(props) {
    const { children: Component, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Component></Component>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.any,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tabpanel-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#ffffff",
        flex: 1,
    },
    fullHeight: {
        height: "fill!important",
    },
    height: {
        height: "100%",
        paddingTop: "50px"
    },
    container: {
        minHeight: "calc(100vh - 60px)"
    }
}));

export function ClinicNavigation() {
    const classes = useStyles()

    const [value, setValue] = useState('view-clinics');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Grid container className={classes.container} >
            <Grid item sm={2}
                className={classes.fullHeight}>
                <AppBar
                    color="secondary"
                    className={classes.height}
                    position="static" >
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleChange}
                        aria-label="clinic tabs">
                        <Tab
                            value="view-clinics"
                            label="View Clinics"
                            {...a11yProps('view-clinics')}
                        />
                        <Tab
                            value="add-clinic"
                            label="Add New Clinic"
                            {...a11yProps('add-clinic')} />
                    </Tabs>
                </AppBar>
            </Grid>
            <Grid item sm={9}>
                <TabPanel value={value} index="view-clinics">
                    {ViewClinics}
                </TabPanel>
                <TabPanel value={value} index="add-clinic" >
                    {AddClinic}
                </TabPanel>
            </Grid>
        </Grid>
    );
}

export default ClinicNavigation;