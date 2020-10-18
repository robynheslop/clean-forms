import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, TextField } from '@material-ui/core';
import CreateQuestion from "./CreateQuestions";

const useStyles = makeStyles({
    root: {
        maxWidth: '83.333333%',
        margin: '0 auto',
        marginTop: '50px',
        padding: '3em 0em',
        minHeight: 'fit-conent',
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

export function Screening({ questionnaire, submitScreening, id }) {
    const classes = useStyles();
    const [radioValues, setRadioValues] = useState()

    const handleChange = event => {
        setRadioValues(...radioValues, event.target.value)
    }

    const handleButtonClick = event => {
        event.preventDefault();
        event.stopPropagation();
        const formData = {
            screeningId: id
        }
        console.log(formData);
        // submitScreening(formData);
    }



    return (
        <Paper className={classes.root}>
            {!isSumbitScreeningSuccess
                ?
                <form className={classes.form}>
                    <h1>{questionnaire.title}</h1>
                    <p>{questionnaire.pretext}</p>
                    {questionnaire.questions.map(question => {
                        <FormControl>
                            <FormLabel>{question.query}</FormLabel>
                            <RadioGroup name={question.query} value={value} onChange={handleChange}>
                                {question.responses.a ? <FormControlLabel value="a" control={<Radio />} label={question.responses.a} /> : undefined}
                                {question.responses.b ? <FormControlLabel value="b" control={<Radio />} label={question.responses.b} /> : undefined}
                                {question.responses.c ? <FormControlLabel value="c" control={<Radio />} label={question.responses.c} /> : undefined}
                                {question.responses.d ? <FormControlLabel value="d" control={<Radio />} label={question.responses.d} /> : undefined}
                            </RadioGroup>
                        </FormControl>
                    })}
                    <p>{questionnaire.posttext ? questionnaire.posttext : undefined}</p>
                    <Button
                        className={classes.button}
                        onClick={handleButtonClick}
                    >Submit Your COVID Declaration</Button>
                </form>
                :
                <div>
                    <h1>Success</h1>
                    <h3>Your Covid Declaration Has Been Submitted.</h3>
                </div>
            }
        </Paper>

    )
}

Screening.propTypes = {
    id: PropTypes.string,
    submitScreening: PropTypes.func,
    isSumbitScreeningSuccess: PropTypes.bool
}

Screening.defaultProps = {
    id: undefined,
    submitScreening: () => {},
    isSumbitScreeningSuccess: false
}

export default Screening;