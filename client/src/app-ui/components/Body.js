import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { Home } from './Home';
import { ClinicDashboard } from '../../clinic-ui';

export function Body() {
    return (
        <Switch>
            <Route path='/clinic' component={ClinicDashboard} />
            <Route path='/' component={Home} />
        </Switch>
    )
}

export default Body;