import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { findIndex, propEq } from 'ramda'
import PropTypes from "prop-types";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Fab, Button, TextField } from '@material-ui/core';
import Question from "./Question";

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

export function Questionnaire({ onSave, onDelete, onCancel, questions, owner, preText, postText, title, }) {
    const classes = useStyles();
    const [questionsState, setQuestionsState] = useState(questions)
    const titleRef = useRef();
    const preTextRef = useRef();
    const postTextRef = useRef();

    const handleSaveQuestion = (id, queryText, responses) => {
        const index = findIndex(propEq("id", id))(questionsState);
        const updatedQuestions = [
            ...questionsState.slice(0, index),
            { ...questionsState[index], queryText, responses },
            ...questionsState.slice(index + 1)
        ]
        setQuestionsState(updatedQuestions)
    }

    const handleDeleteQuestion = (id) => {
        const index = findIndex(propEq("id", id))(questionsState);
        setQuestionsState([
            ...questionsState.slice(0, index),
            ...questionsState.slice(index + 1)
        ])
    }

    const handleAddQuestion = () => {
        setQuestionsState([{ id: uuidv4() }, ...questionsState])
    }

    const handleSave = event => {
        event.preventDefault();
        event.stopPropagation();
        const onSaveQuestions = {
            owner,
            title: titleRef.current.value,
            preText: preTextRef.current.value,
            postText: postTextRef.current.value,
            questions: questionsState
        }
        onSave(onSaveQuestions);
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

                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={handleAddQuestion}>
                    <AddIcon />
                </Fab>

                {questionsState.map(question => {
                    return <Question
                        key={question.id}
                        onSave={(queryText, responses) => handleSaveQuestion(question.id, queryText, responses)}
                        onDelete={() => { handleDeleteQuestion(question.id) }}
                        {...question}
                    />
                })}



                <TextField
                    label='Closing Text'
                    className={classes.input}
                    type='text'
                    name='questionnaireClosingText'
                    inputRef={postTextRef}
                />

                <Button
                    className={classes.button}
                    onClick={handleSave}
                >Save</Button>
                <Button
                    className={classes.button}
                    onClick={onDelete}
                >Delete</Button>
                <Button
                    className={classes.button}
                    onClick={onCancel}
                >Cancel</Button>
            </form>
        </Paper>
    )
}

Questionnaire.propTypes = {
    owner: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
        PropTypes.shape(
            {
                id: PropTypes.string.isRequired,
                queryText: PropTypes.string.isRequired,
                responses: PropTypes.array.isRequired
            }
        )
    ),
    title: PropTypes.string,
    preText: PropTypes.string,
    postext: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
}

Questionnaire.defaultProps = {
    questions: [],
    onSave: () => { },
    onDelete: () => { },
    onCancel: () => { },
}

export default Questionnaire;