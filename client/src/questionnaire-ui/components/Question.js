import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { findIndex, propEq } from "ramda";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Fab, Button, TextField } from '@material-ui/core';
import Response from "./Response"

const useStyles = makeStyles({
    input: {
        lineHeight: "1.2em",
        padding: '10px',
        margin: '10px',
        fontSize: "1.1em",
        width: '80%',
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
    responseInstructions: {
        display: 'inline-block'
    }
})



export function Question({ onSave, onCancel, responses }) {
    const classes = useStyles();
    const [responsesState, setResponsesState] = useState(responses);
    const queryRef = useRef();


    const handleSaveResponse = (id, responseText, isValidReponse) => {
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

    const handleSave = () => {
        onSave(queryRef.current.value, responsesState)
    }

    const handleAddResponse = () => {
        setResponsesState([{ id: uuidv4() }, ...responsesState])
    }

    return (
        <div>
            <TextField
                label='Type out your question here'
                type="text"
                className={classes.input}
                inputRef={queryRef}
                name="question"
            />
            <br></br>
            <div className={classes.responseInstructions}>
                <p>Please click the button and add each possible response to your question below.</p>
                <Fab
                    color="secondary"
                    size='small'
                    aria-label="add-response"
                    onClick={handleAddResponse}
                >
                    <AddIcon />
                </Fab>
            </div>

            {responsesState.map(response => {
                return <Response
                    key={response.id}
                    handleSave={(responseText, isValidReponse) => handleSaveResponse(response.id, responseText, isValidReponse)}
                    handleDelete={() => handleDeleteResponse(response.id)}
                    {...response}
                />
            })}
            <br></br>
            <div>
                <Button onClick={handleSave}>Save Question</Button>
                <Button onClick={onCancel}>Cancel Question</Button>
            </div>
        </div>
    )
}

Question.propTypes = {
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    responses: PropTypes.arrayOf(
        PropTypes.shape(
            {
                id: PropTypes.string.isRequired,
                responseText: PropTypes.string.isRequired,
                isValidResponse: PropTypes.bool
            }
        )
    ),
}

Question.defaultProps = {
    onSave: () => { },
    onCancel: () => { },
    responses: []
}

export default Question;