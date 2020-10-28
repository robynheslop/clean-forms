import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
    DatePicker,
} from '@material-ui/pickers';
import moment from "moment";
import { makeStyles, createMuiTheme, MenuItem, CircularProgress, FormHelperText, Paper, Select, InputLabel, TextField, Button } from '@material-ui/core';
import { ThemeProvider } from "@material-ui/styles";
import { pink, lightBlue } from "@material-ui/core/colors";

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
    input: {
        lineHeight: "1.2em",
        padding: '10px',
        margin: '10px',
        fontSize: "1.1em",
        width: '95%',
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
    },
    progress: {
        display: 'block',
        margin: '20px auto'
    }
})

const defaultMaterialTheme = createMuiTheme({
    overrides: {
        MuiPickersBasePicker: {
            container: { margin: '30px 0 auto' }
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                // backgroundColor: pink.A200,
                // color: "white",
            },
        },
        MuiPickersDay: {
            day: {
                color: pink.A700,
            },
            daySelected: {
                backgroundColor: pink["400"],
            },
            dayDisabled: {
                color: pink["100"],
            },
            current: {
                color: pink["900"],
            },
        },
        MuiPickersModal: {
            dialogAction: {
                color: pink["400"],
            },
        },
    },
});

function AddBooking({ createScreening, activeClinic, questionnaires }) {
    const classes = useStyles();
    const clientNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const [bookingDate, setBookingDate] = useState(moment().format("YYYY-MM-DD"));
    const [questionnaireState, setQuestionnaireState] = useState('');
    const { id, clinicName, phone, isSendScreeningFailed, isSendScreeningSuccess, isSendScreeningPending } = activeClinic;
    const handleChange = (event) => {
        setQuestionnaireState(event.target.value)
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        event.stopPropagation();
        createScreening({
            clinic: id,
            clinicName: clinicName,
            clinicPhone: phone,
            clientName: clientNameRef.current.value,
            phone: phoneRef.current.value,
            email: emailRef.current.value,
            date: bookingDate,
            questionnaireId: questionnaireState
        });
        clientNameRef.current.value = '';
        phoneRef.current.value = '';
        emailRef.current.value = '';
    }
    return (
        <Paper className={classes.root}>
            <h1 className={classes.h1}>ADD A NEW BOOKING</h1>
            <form onSubmit={handleFormSubmit} className={classes.form}>
                <div>
                    <TextField
                        label='Client Name'
                        color={"secondary"}
                        type='text'
                        className={classes.input}
                        name='clientName'
                        inputRef={clientNameRef}
                        required />
                </div>
                <div>
                    <TextField
                        label='Contact Number'
                        color={"secondary"}
                        type='number'
                        className={classes.input}
                        name='phone'
                        inputRef={phoneRef}
                        required />
                </div>
                <div>
                    <TextField
                        label='Email'
                        color={"secondary"}
                        className={classes.input}
                        type='email'
                        name='clientEmail'
                        inputRef={emailRef}
                        required />
                </div>
                <div>
                    <ThemeProvider theme={defaultMaterialTheme}>
                        <DatePicker
                            autoOk
                            disableToolbar
                            color={"secondary"}
                            orientation="landscape"
                            label='Booking Date'
                            value={bookingDate}
                            className={classes.input}
                            onChange={
                                (date) => setBookingDate(moment(date).format("YYYY-MM-DD"))
                            }
                            disablePast={true}
                            format="yyyy/MM/DD"
                            variant={"inline"}
                            required
                        />
                    </ThemeProvider>
                </div>
                <div>
                    <InputLabel>Select A Questionnaire To Send</InputLabel>

                    <Select
                        label='Select A Questionnaire To Send'
                        color="secondary"
                        type='date'
                        name='date'
                        defaultValue={""}
                        value={questionnaireState}
                        onChange={handleChange}
                        disabled={questionnaires[0] === undefined ? true : false}
                        className={classes.select}
                        required>
                        <MenuItem value="">None</MenuItem>
                        {questionnaires[0] === undefined ?
                            undefined :
                            questionnaires.map(questionnaire => {
                                return <MenuItem key={questionnaire._id} id={questionnaire._id} value={questionnaire._id}>{questionnaire.title}</MenuItem>
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

            {isSendScreeningPending ?
                <div className={classes.progress}>
                    <CircularProgress color="secondary" />
                </div> :
                undefined
            }


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