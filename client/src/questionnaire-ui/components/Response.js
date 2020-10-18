import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types'
import { Button, Checkbox, TextField } from '@material-ui/core';

function Response({ handleSave, handleDelete, isValidResponse, responseText }) {
    const [checked, setChecked] = useState(isValidResponse);
    const [responseTextState, setResponseTextState] = useState(responseText)

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
                onChange={({target: {value}}) => setResponseTextState(value)}
                name="response"
            />
            {isValid() ? <Button

                onClick={() => handleSave(responseTextState, checked)}
            >Save</Button>
                : undefined}
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button>
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