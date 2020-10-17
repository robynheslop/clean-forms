import React, { useRef, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { RadioGroup, FormControlLabel, Button, Radio, TextField } from '@material-ui/core';

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

export function CreateQuestion() {
    const classes = useStyles();
    const questionRef = useRef();
    const responseARef = useRef();
    const responseBRef = useRef();
    const responseCRef = useRef();
    const responseDRef = useRef();
    const [validResponse, setValidResponse] = useState();
    const handleRadioChange = (event) => {
        setValidResponse(event.target.value);
    };

    const questionData = {
        question: questionRef,
        responses: {
            a: responseARef.current?.value ? responseARef.current.value : undefined,
            b: responseBRef.current?.value ? responseBRef.current.value : undefined,
            c: responseCRef.current?.value ? responseCRef.current.value : undefined,
            d: responseDRef.current?.value ? responseDRef.current.value : undefined
        },
        validResponse: validResponse
    }
    // need to get question data back to add questionnaire!!! 

    return (
        <div>
            <RadioGroup 
                name="question1"
                onChange={handleRadioChange}>
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
        </div>
    )
}

export default CreateQuestion;