import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, FormControlLabel, RadioGroup, Button, Radio, TextField } from '@material-ui/core';


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

export function CreateQuestionnaire({ createQuestionnaire }) {
    const classes = useStyles();
    const titleRef = useRef();
    const preTextRef = useRef();
    const questionRef = useRef();
    const responseARef = useRef();
    const responseBRef = useRef();
    const responseCRef = useRef();
    const responseDRef = useRef();
    const postTextRef = useRef();

    const [radioValue, setRadioValue] = useState();

    const handleChange = (event) => {
        setRadioValue(event.target.value);
    };


    const handleButtonClick = event => {
        event.preventDefault();
        event.stopPropagation();

        const questions = [{
            question: questionRef,
            responses: {
                a: responseARef.current.value === null ? undefined : responseARef.current.value,
                b: responseBRef.current.value === null ? undefined : responseBRef.current.value,
                c: responseCRef.current.value === null ? undefined : responseCRef.current.value,
                d: responseDRef.current.value === null ? undefined : responseDRef.current.value
            },
            validResponse: radioValue
        }]

        const formData = {
            title: titleRef.current.value,
            pretext: preTextRef.current.value,
            posttext: postTextRef.current.value,
            questions: questions   
        }
        console.log(formData);
        // createQuestionnaire()
    }


    return (
        <Paper className={classes.root}>
            <form className={classes.form}> 
            <TextField
                label='Questionnaire Title'
                className={classes.input}
                type='text'
                name='questionnaireTitle'
                inputRef={titleRef}
                required />

            <TextField
                label='Opening Text'
                className={classes.input}
                type='text'
                name='questionnairePreText'
                inputRef={preTextRef}
                required />


            {/* create multiple options with labels and select correct one */}
            <RadioGroup 
            name="question1"
            onChange={handleChange}>
                <TextField
                        label='Type out your question here and select the valid answer below'
                        type="text"
                        className={classes.input}
                        inputRef={questionRef}
                        name="question"
                    />
                <div>
                    <FormControlLabel
                        value="a"
                        name="q1"
                        control={<Radio />}
                    />
                    <TextField
                        type="text"
                        inputRef={responseARef}
                        name="a"
                    />
                </div>
                <div>
                    <FormControlLabel
                        value="b"
                        name="q1"
                        // disabled={(responseBRef.current.value === undefined) ? true : false}
                        control={<Radio />}
                    />
                    <TextField
                        type="text"
                        inputRef={responseBRef}
                        name="b"
                    />
                </div>
                <div>
                    <FormControlLabel
                        value="c"
                        name="q1"
                        control={<Radio />}
                    />
                    <TextField
                        type="text"
                        inputRef={responseCRef}
                        name="c"
                    />
                </div>
                <div>
                    <FormControlLabel
                        value="d"
                        name="q1"
                        control={<Radio />}
                    />
                    <TextField
                        type="text"
                        inputRef={responseDRef}
                        name="d"
                    />
                </div>
            </RadioGroup>

            {/* create post text */}
            <TextField
                label='Closing Text'
                className={classes.input}
                type='text'
                name='questionnaireClosingText'
                inputRef={postTextRef}
            />

            <Button
                className={classes.button}
                onClick={handleButtonClick}
            >Create Questionnaire</Button>
            </form>
        </Paper>
    )
}

CreateQuestionnaire.propTypes = {
    createQuestionnaire: PropTypes.func,
    isCreateQuestionnairePending: PropTypes.bool,
    isCreateQuestionnaireSuccess: PropTypes.bool,
    isCreateQuestionnaireFailed: PropTypes.bool,
}
CreateQuestionnaire.defaultProps = {
    createQuestionnaire: () => {},
    isCreateQuestionnairePending: false,
    isCreateQuestionnaireSuccess: false,
    isCreateQuestionnaireFailed: false,
}

export default CreateQuestionnaire;