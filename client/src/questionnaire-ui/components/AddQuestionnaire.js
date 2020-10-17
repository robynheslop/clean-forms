import React, { useRef } from "react";
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

export function CreateQuestionnaire({ createQuestionnaire }) {
    const classes = useStyles();
    const titleRef = useRef();
    const preTextRef = useRef();
    const postTextRef = useRef();

    const question1 = useRef();
    const question2 = useRef();
    const question3 = useRef();
    const question4 = useRef();

    const handleButtonClick = event => {
        event.preventDefault();
        event.stopPropagation();
        const formData = {
            title: titleRef.current.value,
            pretext: preTextRef.current.value,
            posttext: postTextRef.current.value,
            questions: [
                question1, question2, question3, question4
            ]
        }
        console.log(formData);
        // createQuestionnaire(formData);
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


                <CreateQuestion required={true} />
                <CreateQuestion required={false} />
                <CreateQuestion required={false} />
                <CreateQuestion required={false} />

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
    createQuestionnaire: () => { },
    isCreateQuestionnairePending: false,
    isCreateQuestionnaireSuccess: false,
    isCreateQuestionnaireFailed: false,
}

export default CreateQuestionnaire;