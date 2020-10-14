import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: '83.333333%',
        margin: '0 auto',
        marginTop: '50px',
        padding: '3em 0em',
        height: '75%'
    },
    form: {
        maxWidth: '50%',
        margin: '0 auto',
        padding: '1em 0em',
    },
    input: {
        lineHeight: "1.2em",
        padding: '10px',
        margin: '10px',
        fontSize: "1.1em",
        width: '100%',
        border: "none",
        backgroundColor: "none!important"
    },
    button: {
        backgroundColor: '#be294f',
        padding: "15px 25px",
        boxShadow: 'none',
        color: 'white',
        margin: '15px',
    },
    successErrorMessage: {
        color: '#be294f'
    }
})

function AddBooking({ addBooking, activeClinic }) {
    const classes = useStyles();
    const clientNameRef = useRef();
    const emailRef = useRef();
    const dateRef = useRef();
    const phoneRef = useRef();
    const { id, isAddingBookingSuccess, isAddingBookingFailed } = activeClinic;
    const handleFormSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        addBooking({
            clinic: id,
            name: clientNameRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value,
            date: dateRef.current.value,
        });
        clientNameRef.current.value = '';
        phoneRef.current.value = '';
        emailRef.current.value = '';
        dateRef.current.value = '';
    }
    return (
        <Paper className={classes.root}>
            <h1>Add A New Booking</h1>
            <form onSubmit={handleFormSubmit} className={classes.form}>
                <div>
                    <TextField 
                    label='Client Name'
                    type='text' 
                    className={classes.input}
                    name='clientName' 
                    inputRef={clientNameRef} 
                    required />
                </div>
                <div>
                    <TextField
                    label='Contact Number'
                    type='number' 
                    className={classes.input}
                    name='phone' 
                    inputRef={phoneRef} 
                    required />
                </div>
                <div>
                    <TextField
                    label='Email'
                    className={classes.input}
                    type='email' 
                    name='clientEmail' 
                    inputRef={emailRef} 
                    required />
                </div>
                <div>
                    <TextField
                    label='Booking Date'
                    className={classes.input}
                    type='date' 
                    name='date' 
                    inputRef={dateRef} 
                    required />
                </div>
                <div>
                    <Button
                    type='submit' 
                    className={classes.button}
                    >Create Booking</Button>
                </div>
            </form>
            {isAddingBookingSuccess ? 
            <p className={classes.successErrorMessage} >Booking Successfully Added</p> 
            : undefined}
            {isAddingBookingFailed ? 
            <p className={classes.successErrorMessage} >Booking Could Not Be Added At This Time</p> 
            : undefined}
        </Paper>
    )
}

AddBooking.propTypes = {
    addBooking: PropTypes.func,
    isAddingBookingPending: PropTypes.bool,
    clinicId: PropTypes.string
}

AddBooking.defaultProps = {
    addBooking: () => { },
    isAddingBookingPending: false,
    clinicId: undefined
}

export default AddBooking;