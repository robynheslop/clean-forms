import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, TextField } from '@material-ui/core';

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
    }
})

function AddClinics({ addClinic, userId }) {
    const classes = useStyles()
    const clinicNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const handleFormSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        addClinic({
            owner: userId,
            clinicname: clinicNameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value
        })
        clinicNameRef.current.value = '';
        emailRef.current.value = '';
        phoneRef.current.value = '';
    }

    return (
        <Paper className={classes.root}>
            <h1>Add A New Clinic</h1>
            <form onSubmit={handleFormSubmit} className={classes.form}>
                <div>
                    <TextField
                        label='Clinic Name'
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
                        className={classes.input}
                        type='email'
                        name='email'
                        inputRef={emailRef}
                        required />
                </div>
                <div>
                    <TextField
                        label='Office Number'
                        className={classes.input}
                        type='phone'
                        name='phone'
                        inputRef={phoneRef}
                        required />
                </div>
                <div>
                    <Button
                        className={classes.button}
                        type='submit'
                        >Add Clinic</Button>
                </div>
            </form>
        </Paper>
    )
}

AddClinics.propTypes = {
    addClinic: PropTypes.func,
    isAddingClinicPending: PropTypes.bool,
    userId: PropTypes.string
}

AddClinics.defaultProps = {
    addClinic: () => { },
    isAddingClinicPending: false,
    userId: undefined
}

export default AddClinics;