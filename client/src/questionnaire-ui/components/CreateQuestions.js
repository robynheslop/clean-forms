import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { RadioGroup, Button, Radio, TextField } from '@material-ui/core';

const useStyles = makeStyles({
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

export function CreateQuestionnaire() {
    const classes = useStyles();
    const questionRef = useRef();
    const responseARef = useRef();
    const responseBRef = useRef();
    const responseCRef = useRef();
    const responseDRef = useRef();

    const [validResponse, setValidResponse] = useState();

    const handleChange = (event) => {
        setRadioValue(event.target.value);
    };

    const questionDetails = {
        question: questionRef,
        responses: {
            a: responseARef.current.value === null ? undefined : responseARef.current.value,
            b: responseBRef.current.value === null ? undefined : responseBRef.current.value,
            c: responseCRef.current.value === null ? undefined : responseCRef.current.value,
            d: responseDRef.current.value === null ? undefined : responseDRef.current.value
        },
        validResponse: validResponse
    }

    return (
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
    )
}

CreateQuestionnaire.propTypes = {
    createQuestionnaire: PropTypes.func,
    isCreateQuestionnairePending: PropTypes.bool,
    isCreateQuestionnaireSuccess: PropTypes.bool,
    isCreateQuestionnaireFailed: PropTypes.bool,
}
CreateQuestionnaire.defaultProps = {
    createQuestionnaire: () => { },
    isCreateQuestionnairePending: false,
    isCreateQuestionnaireSuccess: false,
    isCreateQuestionnaireFailed: false,
}

export default CreateQuestionnaire;