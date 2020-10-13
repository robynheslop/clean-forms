import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

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
        })
    }
    return (
        <div className={classes.root}>
            <h2>Add A New Booking</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label>Client Name: </label>
                    <input type='text' name='clientName' ref={clientNameRef} required />
                </div>
                <div>
                    <label>Client Phone Number: </label>
                    <input type='number' name='phone' ref={phoneRef} required />
                </div>
                <div>
                    <label>Client Email: </label>
                    <input type='email' name='clientEmail' ref={emailRef} required />
                </div>
                <div>
                    <label>Booking Date: </label>
                    <input type='date' name='date' ref={dateRef} required />
                </div>
                <div>
                    <input type='submit' value='Add Booking' />
                </div>
            </form>
            {isAddingBookingSuccess ? 
            <p className={classes.successErrorMessage} >Booking Successfully Added</p> 
            : undefined}
            {isAddingBookingFailed ? 
            <p className={classes.successErrorMessage} >Booking Could Not Be Added At This Time</p> 
            : undefined}
        </div>
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