import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Button, Fab, Checkbox, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function Response({ handleSave, handleDelete, isValidResponse, responseText }) {
    const [checked, setChecked] = useState(isValidResponse);
    const [responseTextState, setResponseTextState] = useState(responseText)

    const handleChecked = (event) => {
        setChecked(event.target.checked)
    };

    const handleChange = ({ target: { value } }) => {
        setResponseTextState(value)
    };

    useEffect(() => {
        handleSave(responseTextState, checked)
    }, [checked, responseTextState])


    return (
        <div>
            <Checkbox
                checked={checked}
                onChange={handleChecked}
            />
            <TextField
                label='Response'
                type="text"
                onChange={handleChange}
                name="response"
            />
            <Button
                size="small"
                onClick={() => handleDelete()}
            ><DeleteIcon/>
            </Button>
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