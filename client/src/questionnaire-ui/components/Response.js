import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { makeStyles, Button, Fab, Checkbox, TextField } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function Response({ handleSave, handleDelete, isValidResponse, responseText }) {
    const [checked, setChecked] = useState(isValidResponse);
    const [responseTextState, setResponseTextState] = useState(responseText)
    const [isSavedState, setIsSavedState] = useState(false)

    const handleChecked = (event) => {
        console.log('event.target.checked', event.target.checked)
        setChecked(event.target.checked);
    };

    const handleCancel = () => {

    }

    const isValid = () => {
        return responseTextState?.length && responseTextState.length > 0
    }

    return (
        <div>
            <Checkbox
                checked={checked}
                onChange={handleChecked}
            />
            <TextField
                label='Response'
                type="text"
                onChange={({ target: { value } }) => setResponseTextState(value)}
                name="response"
            />
            {isValid() ?
                <div>
                    <Fab
                        color="secondary"
                        size="small"
                        onClick={() => {
                            setIsSavedState(false)
                            handleSave(responseTextState, checked)
                        }}
                    >
                        <CheckCircleOutlineIcon />

                    </Fab>

                    {/* <Fab
                        color="secondary"
                        size="small"
                        onClick={() => handleDelete()}
                    >
                        <DeleteForeverIcon />
                    </Fab> */}
                </div>
                : undefined}


            {/* <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button> */}
        </div>
    )
}

Response.propTypes = {
    handleSave: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    responseText: PropTypes.string,
    isValidResponse: PropTypes.bool
}
Response.defaultProps = {
    handleSave: () => { },
    handleDelete: () => { },
    responseText: undefined,
    isValidResponse: false
}

export default Response;