import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, TextField, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: '83.333333%',
        margin: '50px auto',
        marginTop: '50px',
        padding: '3em 0em',
        height: 'fit-content'
    },
    form: {
        maxWidth: '50%',
        margin: '0 auto',
        padding: '1em 0em',
    },
    h1: {
        fontFamily: 'Poiret One',
        fontSize: '50px',
        padding: '30px'
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
        color: '#be294f',
        textAlign: 'center'
    },
    progress: {
        display: 'block',
        margin: '20px auto'
    }
})

function AddClinics({ isAddClinicPending, isAddClinicSuccess, isAddClinicFailed, addClinic, userId }) {
    const classes = useStyles()
    const clinicNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();

    const handleFormSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        addClinic({
            owner: userId,
            clinicName: clinicNameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value
        })
        clinicNameRef.current.value = '';
        emailRef.current.value = '';
        phoneRef.current.value = '';
    }

    return (
        <Paper className={classes.root}>
            <h1 className={classes.h1}>ADD A NEW CLINIC</h1>
            <form onSubmit={handleFormSubmit} className={classes.form}>
                <div>
                    <TextField
                        label='Clinic Name'
                        color="secondary"
                        className={classes.input}
                        type='text'
                        name='clinicName'
                        pattern='.{2,20}'
                        inputRef={clinicNameRef}
                        required />
                </div>
                <div>
                    <TextField
                        label='Email'
                        color="secondary"
                        className={classes.input}
                        type='email'
                        name='email'
                        inputRef={emailRef}
                        required />
                </div>
                <div>
                    <TextField
                        label='Office Number'
                        color="secondary"
                        className={classes.input}
                        type='number'
                        name='phone'
                        inputRef={phoneRef}
                        required />
                </div>
                <div>
                    <Button
                        className={classes.button}
                        type='submit'
                    >Add Clinic</Button>

                    {isAddClinicPending ?
                        <div className={classes.progress}>
                            <CircularProgress color="secondary" />
                        </div> :
                        undefined
                    }
                </div>
            </form>

            {isAddClinicSuccess ?
                <p className={classes.successErrorMessage} >Successfully added your new clinic.</p>
                : undefined}
            {isAddClinicFailed ?
                <p className={classes.successErrorMessage} >Clinic could not be added.</p>
                : undefined}
        </Paper>
    )
}

AddClinics.propTypes = {
    addClinic: PropTypes.func,
    isAddClinicPending: PropTypes.bool,
    isAddClinicFailed: PropTypes.bool,
    isAddClinicSuccess: PropTypes.bool,
    userId: PropTypes.string
}

AddClinics.defaultProps = {
    addClinic: () => { },
    isAddClinicPending: false,
    isAddClinicFailed: false,
    isAddClinicSuccess: false,
    userId: undefined
}

export default AddClinics;