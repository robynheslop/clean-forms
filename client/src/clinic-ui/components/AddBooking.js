import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, FormHelperText, Paper, Select, InputLabel, TextField, Button } from '@material-ui/core';

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
    h1: {
        fontFamily: 'Poiret One',
        fontSize: '50px',
        padding: '30px'
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
    select: {
        width: '50%'
    }
})

function AddBooking({ createScreening, activeClinic, questionnaires }) {
    const classes = useStyles();
    const clientNameRef = useRef();
    const emailRef = useRef();
    const dateRef = useRef();
    const phoneRef = useRef();
    const [questionnaireState, setQuestionnaireState] = useState('');
    const { id, clinicname, phone, isSendScreeningFailed, isSendScreeningSuccess } = activeClinic;

    const handleChange = (event) => {
        setQuestionnaireState(event.target.value)
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        createScreening({
            clinic: id,
            clinicName: clinicname,
            clinicPhone: phone,
            clientName: clientNameRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value,
            date: dateRef.current.value,
            questionnaireId: questionnaireState
        });
        clientNameRef.current.value = '';
        phoneRef.current.value = '';
        emailRef.current.value = '';
        dateRef.current.value = '';
    }
    return (
        <Paper className={classes.root}>
            <h1 className={classes.h1}>ADD A NEW BOOKING</h1>
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
                    <InputLabel>Select A Questionnaire To Send</InputLabel>

                    <Select
                        label='Select A Questionnaire To Send'
                        type='date'
                        name='date'
                        value={questionnaireState}
                        onChange={handleChange}
                        disabled={questionnaires[0] === undefined ? true : false}
                        className={classes.select}
                        required>
                            <option value="">None</option>
                        {questionnaires[0] === undefined ?
                            undefined :
                            questionnaires.map(questionnaire => {
                                return <option key={questionnaire._id} id={questionnaire._id} value={questionnaire._id}>{questionnaire.title}</option>
                            })
                        }
                    </Select>
                    {questionnaires[0] === undefined ?
                        <FormHelperText
                            className={classes.successErrorMessage}
                        >You have no questionnaires to send. Please create one and try again.</FormHelperText>
                        : undefined}
                </div>
                <div>
                    <Button
                        type='submit'
                        className={classes.button}
                    >Create Booking</Button>
                </div>
            </form>
            {isSendScreeningSuccess ?
                <p className={classes.successErrorMessage} >Booking Successfully Added</p>
                : undefined}
            {isSendScreeningFailed ?
                <p className={classes.successErrorMessage} >Booking Could Not Be Added At This Time</p>
                : undefined}
        </Paper>
    )
}

AddBooking.propTypes = {
    createScreening: PropTypes.func,
    questionnaires: PropTypes.array,
    isSendScreeningPending: PropTypes.bool,
    isSendScreeningSuccess: PropTypes.bool,
    isSendScreeningFailed: PropTypes.bool,
    activeClinic: PropTypes.object
}

AddBooking.defaultProps = {
    createScreening: () => { },
    questionnaires: [],
    isSendScreeningPending: false,
    isSendScreeningSuccess: false,
    isSendScreeningFailed: false,
    activeClinic: {}
}

export default AddBooking;