import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { findIndex, propEq } from "ramda";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Fab, TextField } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import Response from "./Response";

const useStyles = makeStyles({
    root: {
        backgroundColor: '#ebebeb',
        margin: '20px auto',
        padding: '15px',
        borderRadius: '5px',
        width: '80%',
        position: 'relative'
    },
    deleteFab: {
        position: 'absolute',
        top: '-15px',
        right: '-15px'
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
    button: {
        backgroundColor: '#be294f',
        padding: "15px 25px",
        boxShadow: 'none',
        color: 'white',
        margin: '15px',
    },

})

export function Question({ onSave, queryText, onDelete, responses }) {
    const classes = useStyles();
    const [responsesState, setResponsesState] = useState(responses);
    const [questionTextState, setQuestionTextState] = useState(queryText)


    const handleSaveResponse = (id, responseText, isValidReponse) => {
        console.log('updating state in question')
        const index = findIndex(propEq("id", id))(responsesState);
        setResponsesState([
            ...responsesState.slice(0, index),
            { ...responsesState[index], responseText, isValidReponse },
            ...responsesState.slice(index + 1)
        ])
    }

    const handleDeleteResponse = (id) => {
        const index = findIndex(propEq("id", id))(responsesState);
        setResponsesState([
            ...responsesState.slice(0, index),
            ...responsesState.slice(index + 1)
        ])
    }

    const handleChange = ({ target: { value } }) => {
        setQuestionTextState(value)
    };

    useEffect(() => {
        onSave(questionTextState, responsesState)
    }, [questionTextState, responsesState])

    const handleAddResponse = () => {
        setResponsesState([{ id: uuidv4() }, ...responsesState])
    }

    return (
        <div className={classes.root}>
            <Fab
                color="secondary"
                className={classes.deleteFab}
                size='medium'
                aria-label="add-response"
                onClick={onDelete}
            >
                <CancelIcon />
            </Fab>
            <TextField
                label='Type out your question here'
                type="text"
                multiline
                className={classes.input}
                onChange={handleChange}
                name="question"
            />
            <br></br>
            <p>Add each possible reponse, and select the checkboxes of the valid responses.</p>
            <Fab
                color="secondary"
                size='small'
                aria-label="add-response"
                onClick={handleAddResponse}
            >
                <AddIcon />
            </Fab>

            {responsesState.map(response => {
                return <Response
                    key={response.id}
                    handleSave={(responseText, isValidReponse) => handleSaveResponse(response.id, responseText, isValidReponse)}
                    handleDelete={() => handleDeleteResponse(response.id)}
                    {...response}
                />
            })}

        </div>
    )
}

Question.propTypes = {
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
    queryText: PropTypes.string,
    responses: PropTypes.arrayOf(
        PropTypes.shape(
            {
                id: PropTypes.string.isRequired,
                responseText: PropTypes.string,
                isValidResponse: PropTypes.bool
            }
        )
    ),
}

Question.defaultProps = {
    onSave: () => { },
    onDelete: () => { },
    queryText: undefined,
    responses: []
}

export default Question;