import React, { useEffect, useRef, useState, } from "react";
import { useLocation } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import { findIndex, propEq } from 'ramda';
import PropTypes from "prop-types";
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Fab, Button, TextField, CircularProgress } from '@material-ui/core';
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
    },
    h1: {
        fontFamily: 'Poiret One',
        fontSize: '50px',
        padding: '30px'
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

export function Questionnaire({ history, isSaveQuestionnairePending, isSaveQuestionnaireFailed, isSaveQuestionnaireSuccess, onSave, onDelete, onCancel, id, questions, owner, preText, postText, title, isEditing }) {
    console.log('isEditing',isEditing)
    const classes = useStyles();
    const [questionsState, setQuestionsState] = useState(questions );
    const [titleState, setTitleState] = useState(title);
    const [preTextState, setPreTextState] = useState(preText);
    const [postTextState, setPostTextState] = useState(postText);

    useEffect(()=> {
        if (isEditing) return 
        setQuestionsState(questions)
        setTitleState('')
        setPreTextState('')
        setPostTextState('')
    }, [id, questions, owner, preText, postText, title, isEditing])

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
            id,
            owner,
            title: titleState,
            preText: preTextState,
            postText: postTextState,
            questions: questionsState
        }
        onSave(onSaveQuestions);
        history.push('/clinic/questionnaires');
    }

    const handleDelete = event => {
        event.preventDefault();
        event.stopPropagation();
        onDelete(id)
    }

    return (
        <Paper className={classes.root} >
            { isEditing ?
                <h1 className={classes.h1}>EDIT YOUR QUESTIONNAIRE</h1>
                :
                <h1 className={classes.h1}>ADD A NEW QUESTIONNAIRE</h1>
            }
            <form className={classes.form} autoComplete="off">
                <TextField
                    label='Questionnaire Title'
                    className={classes.input}
                    type='text'
                    name='questionnaireTitle'
                    value={titleState}
                    onChange={({ target: { value } }) => {
                        setTitleState(value)
                    }}
                    required />

                <TextField
                    label='Opening Text'
                    helperText="Add any instructions or explanations about your questionnaire here for your clients to read before they start."
                    className={classes.input}
                    type='text'
                    multiline
                    name='questionnairePreText'
                    value={preTextState}
                    onChange={({ target: { value } }) => {
                        setPreTextState(value)
                    }}
                    required />
                <br></br>

                <Fab
                    size="medium"
                    variant="extended"
                    color="secondary"
                    aria-label="add"
                    onClick={handleAddQuestion}>
                    Add A Question<AddIcon />
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
                    helperText="Add any final notes, such as to thank your clients and let them know the next steps."
                    className={classes.input}
                    type='text'
                    multiline
                    name='questionnaireClosingText'
                    value={postTextState}
                    onChange={({ target: { value } }) => {
                        setPostTextState(value)
                    }}
                />

                <Button
                    className={classes.button}
                    onClick={handleSave}
                >Save</Button>
                <Button
                    className={classes.button}
                    onClick={handleDelete}
                >Delete</Button>
                <Button
                    className={classes.button}
                    onClick={onCancel}
                >Cancel</Button>

                {isSaveQuestionnairePending ?
                    <div className={classes.progress}>
                        <CircularProgress color="secondary" />
                    </div> :
                    undefined
                }
            </form>

            {isSaveQuestionnaireSuccess ?
                <p className={classes.successErrorMessage} >Questionnaire Successfully Added</p>
                : undefined}
            {isSaveQuestionnaireFailed ?
                <p className={classes.successErrorMessage} >Questionnaire Could Not Be Added At This Time</p>
                : undefined}

        </Paper>
    )
}

Questionnaire.propTypes = {
    isEditing: PropTypes.bool.isRequired,
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
    onCancel: PropTypes.func.isRequired,
    isSaveQuestionnairePending: PropTypes.bool,
    isSaveQuestionnaireSuccess: PropTypes.bool,
    isSaveQuestionnaireFailed: PropTypes.bool
}

Questionnaire.defaultProps = {
    isEditing: false,
    questions: [],
    onSave: () => { },
    onDelete: () => { },
    onCancel: () => { },
    isSaveQuestionnairePending: false,
    isSaveQuestionnaireSuccess: false,
    isSaveQuestionnaireFailed: false
}

export default Questionnaire;